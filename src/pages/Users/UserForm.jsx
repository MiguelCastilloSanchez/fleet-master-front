export default function UserForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Nombre del usuario" required className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Admin</button>
    </form>
  );
}
