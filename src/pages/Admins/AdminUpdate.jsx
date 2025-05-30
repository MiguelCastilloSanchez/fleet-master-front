import { useState, useEffect } from 'react';
import { getAdminById, updateAdmin } from '../../services/adminServiceApi.js';

export default function AdminForm({ onSuccess, adminId }) {
  const [formState, setFormState] = useState({
    id: '',
    username: '',
    password: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminResult = await getAdminById(adminId);
        setFormState({
          id: adminResult.id,
          username: adminResult.username,
          password: adminResult.password,
          name: adminResult.name,
          email: adminResult.email
        });
      } catch (err) {
        alert('Error al cargar datos del administrador');
        console.error('Error al cargar datos del administrador:', err);
      }
    };

    if (adminId) {
      fetchAdmin();
    }
  }, [adminId]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateAdmin(formState);
      alert('Administrador actualizado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar el administrador');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.id}</label>
      <label className="flex flex-col">
        Nombre de usuario
        <input 
          name="username" 
          value={formState.username} 
          onChange={handleChange} 
          placeholder="Nombre de usuario" 
          required 
          className="border p-2 rounded" 
        />
      </label>
      <label className="flex flex-col">
        Contraseña
        <input 
          name="password" 
          type="password"   
          onChange={handleChange}  
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
        Correo electrónico
        <input 
          name="email"
          type="email" 
          value={formState.email} 
          onChange={handleChange} 
          placeholder="@email" 
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
