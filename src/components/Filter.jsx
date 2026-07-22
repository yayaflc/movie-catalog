import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const DEFAULT_OPTIONS = [
  { value: "az", label: "Ordem A - Z" },
  { value: "top_rated", label: "Mais bem avaliados" },
  { value: "popular", label: "Populares" },
];

export default function Filter({
  value = "top_rated",
  onChange,
  options = DEFAULT_OPTIONS,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function handleSelect(nextValue) {
    if (onChange) onChange(nextValue);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative z-filter w-full shrink-0 font-sans sm:w-filter">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl bg-neutral-700 px-4 py-3 text-left text-sm text-white"
      >
        <span className="truncate pr-2">{selected && selected.label}</span>
        <FaChevronDown size={12} aria-hidden="true" />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-dropdown mt-1 overflow-hidden rounded-xl bg-neutral-600 shadow-lg"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            const optionClass = active
              ? "w-full px-4 py-3 text-left text-sm text-white bg-neutral-700"
              : "w-full px-4 py-3 text-left text-sm text-white bg-neutral-600 hover:bg-neutral-500";

            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={optionClass}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
