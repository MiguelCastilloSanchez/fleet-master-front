export default function CoordinateForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Nombre de la Ubicación" required className="border p-2 rounded" />
      <input type="text" placeholder="Latitud" required className="border p-2 rounded" />
      <input type="text" placeholder="Altitud" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Destino</button>
    </form>
  );
}
