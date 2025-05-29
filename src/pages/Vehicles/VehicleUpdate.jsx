import { useState, useEffect } from 'react';
import { getVehicleById, updateVehicle } from '../../services/vehicleServiceApi.js';

export default function VehicleUpdate({ onSuccess, vehicleId }) {
  const [formState, setFormState] = useState({
    id: '',
    brand: '',
    vin: '',
    plate: '',
    purchaseDate: '',
    cost: '',
    photoUrl: '',
    registrationDate: '',
  });

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const vehicle = await getVehicleById(vehicleId);
        setFormState({
          id: vehicle.id,
          brand: vehicle.brand || '',
          vin: vehicle.vin || '',
          plate: vehicle.plate || '',
          purchaseDate: vehicle.purchaseDate || '',
          cost: vehicle.cost || '',
          photoUrl: vehicle.photoUrl || '',
          registrationDate: vehicle.registrationDate || '',
        });
      } catch (err) {
        console.error('Error al cargar datos del vehículo:', err);
      }
    }
    if (vehicleId) fetchVehicle();
  }, [vehicleId]);

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
      const result = await updateVehicle(formState);
      alert('Vehículo actualizado con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar el vehículo');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.id}</label>

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
          Actualizar
        </button>
      </div>
      </form>
    );
  }