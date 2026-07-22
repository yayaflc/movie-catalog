export default function CastTags({ cast = [] }) {
  const people = cast.slice(0, 10).filter((person) => person && person.name);
  if (people.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => (
        <span
          key={person.id || person.name}
          className="rounded-lg bg-neutral-700 px-3 py-2 text-sm text-white"
        >
          {person.name}
        </span>
      ))}
    </div>
  );
}