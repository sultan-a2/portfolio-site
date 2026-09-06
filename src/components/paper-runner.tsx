"use client";

import { useEffect, useRef } from "react";

/**
 * Paper Runners — Lift: the traced runner outline, extruded 0.38 deep and lit
 * in the Wayfarer spectrum. The extrusion has no back worth showing, so the
 * figure sways between two three-quarter views instead of turning all the way
 * round — it never reaches the profile where it would read as a sliver.
 */
const SWAY = 0.62; // radians, ~35 degrees either side of front-on
const RATE = 0.42; // radians per second into the sine, so a 15s round trip
const REST = -0.44; // the pose it holds when motion is turned off

export function PaperRunner() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    let cancelled = false;
    let dispose = () => {};

    (async () => {
      const THREE = await import("three");
      const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js");
      if (cancelled) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // no WebGL: the masthead just keeps its space empty
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearAlpha(0);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      node.append(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
      camera.position.set(0, 0, 7.4);

      // The key is a point light rather than a directional one: the front of a
      // die-cut sits in a single plane, and only falloff gives that plane a
      // gradient instead of one flat fill. The two rims are the colours off the
      // ends of the Wayfarer band, kept behind so they only graze the bevels.
      scene.add(new THREE.HemisphereLight(0x394153, 0x0a0b0f, 1.15));
      const key = new THREE.PointLight(0xfff2df, 82, 18, 2);
      key.position.set(-2.2, 2.8, 3.6);
      scene.add(key);
      const cool = new THREE.DirectionalLight(0x2a8fbf, 1.8);
      cool.position.set(4, 1, -2.2);
      scene.add(cool);
      const warm = new THREE.DirectionalLight(0xd94a32, 0.6);
      warm.position.set(-2.2, -2, -2.8);
      scene.add(warm);

      const figure = new THREE.Group();
      scene.add(figure);

      const material = new THREE.MeshStandardMaterial({
        color: 0xece9e0,
        roughness: 0.58,
        metalness: 0,
      });

      let ready = false;
      new OBJLoader().load("/models/paper-runner-lift.obj", (object) => {
        if (cancelled) return;
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) child.material = material;
        });
        const box = new THREE.Box3().setFromObject(object);
        const centre = box.getCenter(new THREE.Vector3());
        object.position.sub(centre);
        figure.add(object);
        figure.rotation.y = REST;
        ready = true;
        render();
      });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = node;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Frame on height so the figure keeps its size in a narrow column.
        camera.fov = 2 * THREE.MathUtils.radToDeg(Math.atan(3.25 / (2 * camera.position.z)));
        camera.updateProjectionMatrix();
        render();
      };

      function render() {
        renderer.render(scene, camera);
      }

      const still = window.matchMedia("(prefers-reduced-motion: reduce)");
      let started = 0;
      let frame = 0;
      let onscreen = true;

      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (!ready) return;
        const t = (now - started) / 1000;
        figure.rotation.y = Math.sin(t * RATE) * SWAY;
        figure.rotation.z = Math.sin(t * RATE + 1.1) * 0.036;
        figure.position.y = Math.sin(t * RATE * 2) * 0.06;
        render();
      };

      const run = () => {
        const wanted = onscreen && !still.matches && !document.hidden;
        if (wanted && !frame) {
          started = performance.now();
          tick(started);
        } else if (!wanted && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
          if (still.matches) {
            figure.rotation.set(0, REST, 0);
            figure.position.y = 0;
            render();
          }
        }
      };

      const watcher = new IntersectionObserver(([entry]) => {
        onscreen = entry.isIntersecting;
        run();
      });
      watcher.observe(node);

      const sizer = new ResizeObserver(resize);
      sizer.observe(node);
      resize();

      document.addEventListener("visibilitychange", run);
      still.addEventListener("change", run);
      run();

      dispose = () => {
        if (frame) cancelAnimationFrame(frame);
        watcher.disconnect();
        sizer.disconnect();
        document.removeEventListener("visibilitychange", run);
        still.removeEventListener("change", run);
        material.dispose();
        figure.traverse((child) => {
          if (child instanceof THREE.Mesh) child.geometry.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={holder}
      className="paper-runner"
      role="img"
      aria-label="Paper Runners, Lift — a cut-out runner turning in place"
    />
  );
}
