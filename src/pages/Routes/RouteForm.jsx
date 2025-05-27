export default function RouteForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Nombre de la ruta" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de viaje" required className="border p-2 rounded" />
      <input type="text" placeholder="Nombre del destino" required className="border p-2 rounded" />
      <input type="text" placeholder="Nombre del conductor" required className="border p-2 rounded" />
      <input type="text" placeholder="Vehículo" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar ruta</button>
    </form>
  );
}
