import { useState, useEffect } from 'react';
import { getDriverById, updateDriver } from '../../services/driverServiceApi.js'; 

export default function DriverForm({ onSuccess, driverId }) {
  const [formState, setFormState] = useState({
    id: '',
    address: '',
    salary: ''
  });

  // ✅ Carga los datos cuando el componente monta o driverId cambia
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const driverResult = await getDriverById(driverId);
        setFormState({
          id: driverResult.id,
          address: driverResult.address,
          salary: driverResult.salary
        });
      } catch (err) {
        console.error('Error al cargar datos del conductor:', err);
      }
    };

    if (driverId) {
      fetchDriver();
    }
  }, [driverId]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateDriver(formState);
      alert('Conductor actualizado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar el conductor');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.id}</label>
      <label className="flex flex-col">
        Dirección
        <input 
          name="address" 
          value={formState.address} 
          onChange={handleChange} 
          placeholder="Dirección" 
          required 
          className="border p-2 rounded" 
        />
      </label>
      <label className="flex flex-col">
        Salario
        <input 
          name="salary" 
          type="number" 
          step="0.01" 
          value={formState.salary} 
          onChange={handleChange} 
          placeholder="Salario" 
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
