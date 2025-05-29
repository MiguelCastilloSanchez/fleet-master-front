import { useState } from 'react';
import { createVehicle } from '../../services/vehicleServiceApi.js';

export default function VehicleForm({ onSuccess }) {
  const [formState, setFormState] = useState({
    brand: '',
    vin: '',
    plate: '',
    purchaseDate: '',
    cost: '',
    photoUrl: '',
    registrationDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createVehicle(formState);
      alert('Vehículo creado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear el vehículo');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        Marca
        <input
          name="brand"
          value={formState.brand}
          onChange={handleChange}
          placeholder="Marca"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        VIN
        <input
          name="vin"
          value={formState.vin}
          onChange={handleChange}
          placeholder="VIN"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Placa
        <input
          name="plate"
          value={formState.plate}
          onChange={handleChange}
          placeholder="Placa"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Fecha de compra
        <input
          type="date"
          name="purchaseDate"
          value={formState.purchaseDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Costo
        <input
          type="number"
          name="cost"
          value={formState.cost}
          onChange={handleChange}
          placeholder="Costo"
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        URL de foto
        <input
          type="url"
          name="photoUrl"
          value={formState.photoUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Fecha de registro
        <input
          type="date"
          name="registrationDate"
          value={formState.registrationDate}
          onChange={handleChange}
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
