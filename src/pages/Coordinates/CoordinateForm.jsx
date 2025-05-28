import { useState } from 'react';
import { createCoordinate } from '../../services/coordinatesServiceApi.js';

export default function CoordinateForm({ onSuccess }) {

  const [formState, setFormState] = useState({
    name: '',
    latitude: '',
    altitude: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createCoordinate(formState);
      alert('Destino creado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear el destino');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">Nombre<input name="name"  value={formState.name} onChange={handleChange} placeholder="Nombre" required minLength={18} maxLength={25} className="border p-2 rounded" /></label>
      <label className="flex flex-col">Latitud<input name="latitude" type="number" value={formState.latitude} onChange={handleChange} placeholder="Latitud" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Altitud<input name="altitude" type="number" value={formState.altitude} onChange={handleChange} placeholder="Altitud" required className="border p-2 rounded" /></label>

      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </div>
    </form>
  );
}
