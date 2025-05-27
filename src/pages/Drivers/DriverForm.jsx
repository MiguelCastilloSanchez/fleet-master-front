export default function DriverForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Nombre del conductor" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de nacimiento" required className="border p-2 rounded" />
      <input type="text" placeholder="Curp" required className="border p-2 rounded" />
      <input type="text" placeholder="Dirección" required className="border p-2 rounded" />
      <input type="text" placeholder="Salario" required className="border p-2 rounded" />
      <input type="text" placeholder="Núm. Licencia" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de entrada al sistema" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar conductor</button>
    </form>
  );
}
