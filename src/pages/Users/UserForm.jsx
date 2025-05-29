import { useState } from 'react';
import { createUser } from '../../services/userServiceApi.js';






export default function UserForm({ onSuccess }) {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    code: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUser(formState);
      alert('Usuario creado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear el usuario');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        Password
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
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
          Crear
        </button>
      </div>
    </form>
  );
}