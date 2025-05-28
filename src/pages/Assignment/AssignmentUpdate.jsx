export default function AssignmentForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Id del conductor" required className="border p-2 rounded" />
      <input type="text" placeholder="Id del vehículos" required className="border p-2 rounded" />
      <input type="text" placeholder="Fecha de asignación ¿Aunque se puede buscar sola no?" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Asignación</button>
    </form>
  );
}
