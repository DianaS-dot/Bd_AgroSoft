export default function Encabezado({
  busqueda,
  cambiarBusqueda,
}) {
  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-[#dce6df] bg-white px-4 md:px-5">
      {/* Buscador */}
      <div className="relative w-full max-w-420px">
        <BuscarIcono />

        <input
          type="text"
          value={busqueda}
          onChange={(e) =>
            cambiarBusqueda(e.target.value)
          }
          placeholder="Buscar cultivos..."
          className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white pl-10 pr-4 text-sm text-[#274d38] outline-none transition placeholder:text-[#9aafa1] focus:border-[#178343] focus:ring-2 focus:ring-[#178343]/10"
        />
      </div>

      {/* Usuario */}
      <div className="hidden items-center gap-3 sm:flex">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce6df] text-[#245b3c]"
        >
          <CampanaIcono />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-[#dce6df] px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#168343] text-xs font-bold text-white">
            AM
          </div>

          <div>
            <p className="text-xs font-semibold text-[#173b2a]">
              usuario...
            </p>

            <p className="text-[10px] text-[#7c9a89]">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function BuscarIcono() {
  return (
    <svg
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aae9f]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CampanaIcono() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}