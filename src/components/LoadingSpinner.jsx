import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-16" aria-label="Carregando">
      <FaSpinner className="animate-spin text-4xl text-brand" aria-hidden="true" />
    </div>
  );
}
