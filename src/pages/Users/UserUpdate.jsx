import { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../services/userServiceApi.js';

export default function UserUpdate({ onSuccess, userId }) {
  const [formState, setFormState] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    code: '',
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserById(userId);
        setFormState({
          id: user.id,
          username: user.username || '',
          name: user.name || '',
          email: user.email || '',
          code: user.code || '',
        });
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser(formState);
      alert('Usuario actualizado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar el usuario');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.id}</label>

      <label className="flex flex-col">
        Username
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Nombre
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Email
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Código
        <input
          name="code"
          value={formState.code}
          onChange={handleChange}
          placeholder="Código"
          required
          className="border p-2 rounded"
        />
      </label>

      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Actualizar
        </button>
      </div>
    </form>
  );
}