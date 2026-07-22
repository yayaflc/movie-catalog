import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ value = "", onChange, placeholder = "Buscar filmes..." }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = text.trim();
      const current = (value || "").trim();
      if (next !== current) {
        onChange(next);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [text, value, onChange]);

  function clearSearch() {
    setText("");
    onChange("");
  }

  return (
    <div className="relative w-full min-w-0 sm:w-72 font-sans">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar filmes"
        className="w-full rounded-xl bg-neutral-700 py-3 pl-4 pr-10 text-sm text-white outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-brand"
      />
      {text ? (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Limpar busca"
          className="absolute inset-y-0 right-3 flex items-center rounded p-1 text-neutral-400 hover:text-white"
        >
          <FaTimes size={12} aria-hidden="true" />
        </button>
      ) : (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
          <FaSearch size={14} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
