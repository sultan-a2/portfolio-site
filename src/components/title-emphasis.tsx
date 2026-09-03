export function TitleEmphasis({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return <em>{parts[0]}</em>;
  }

  const last = parts.at(-1);
  return (
    <>
      {parts.slice(0, -1).join(" ")} <em>{last}</em>
    </>
  );
}
