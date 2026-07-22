import { useState } from "react";

function getImportantCrew(crew) {
  const people = [];

  for (const person of crew || []) {
    if (!person.name) continue;

    let role = null;
    if (person.job === "Director") role = "Diretor";
    if (person.job === "Writer" || person.job === "Screenplay") role = "Escritor";
    if (!role) continue;

    const found = people.find((item) => item.name === person.name);
    if (found) {
      if (!found.roles.includes(role)) {
        found.roles.push(role);
      }
    } else {
      people.push({ name: person.name, roles: [role] });
    }
  }

  return people;
}

export default function CrewList({ crew }) {
  const [showAll, setShowAll] = useState(false);
  const people = getImportantCrew(crew);

  if (people.length === 0) return null;

  const visiblePeople = showAll ? people : people.slice(0, 2);

  return (
    <div className="font-sans text-sm">
      <ul className="space-y-3">
        {visiblePeople.map((person) => (
          <li key={person.name}>
            <p className="font-semibold leading-tight text-white">{person.name}</p>
            <p className="text-neutral-400">{person.roles.join(", ")}</p>
          </li>
        ))}
      </ul>

      {people.length > 2 ? (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-xs font-semibold text-brand hover:underline"
        >
          {showAll ? "Ver menos" : "Ver mais (" + (people.length - 2) + ")"}
        </button>
      ) : null}
    </div>
  );
}
