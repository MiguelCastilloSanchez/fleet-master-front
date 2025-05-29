import { useState } from 'react';
import { createDriver } from '../../services/driverServiceApi.js'; 

export default function DriverForm({ onSuccess }) {

  const [formState, setFormState] = useState({
    name: '',
    curp: '',
    birthDate: '',
    address: '',
    salary: '',
    licenseNumber: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createDriver(formState);
      alert('Conductor creado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear el conductor');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">Nombre<input name="name" value={formState.name} onChange={handleChange} placeholder="Nombre" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">CURP<input name="curp" minLength={18} maxLength={18} value={formState.curp} onChange={handleChange} placeholder="CURP" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Fecha de nacimiento<input name="birthDate" type="date" value={formState.birthDate} onChange={handleChange} placeholder="Fecha de nacimiento" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Dirección<input name="address" value={formState.address} onChange={handleChange} placeholder="Dirección" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Salario<input name="salary" type="number" step="0.01" value={formState.salary} onChange={handleChange} placeholder="Salario" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Número de licencia<input name="licenseNumber" minLength={10} maxLength={10} value={formState.licenseNumber} onChange={handleChange} placeholder="Número de licencia" required className="border p-2 rounded" /></label>

      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </div>
    </form>
  );
}
