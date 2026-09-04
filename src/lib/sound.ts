const cache = new Map<string, HTMLAudioElement>();

/** Short interface sounds. Every call is a fresh node so taps can overlap. */
export function playSound(name: "tap" | "transition", volume = 0.35) {
  if (typeof window === "undefined") return;

  let source = cache.get(name);
  if (!source) {
    source = new Audio(`/sounds/${name}.wav`);
    source.preload = "auto";
    cache.set(name, source);
  }

  const node = source.cloneNode() as HTMLAudioElement;
  node.volume = volume;
  void node.play().catch(() => {});
}
