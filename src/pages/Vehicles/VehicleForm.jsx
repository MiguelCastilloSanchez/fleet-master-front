export default function VehicleForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Marca" required className="border p-2 rounded" />
      <input type="text" placeholder="Vin" required className="border p-2 rounded" />
      <input type="text" placeholder="Matrícula" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de compra" required className="border p-2 rounded" />
      <input type="text" placeholder="Costo" required className="border p-2 rounded" />
      <input type="text" placeholder="Foto" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de registro" required className="border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar vehículo</button>
    </form>
  );
}
