import { useState, useEffect } from 'react';
import { createAssignment } from '../../services/assignmentServiceApi.js';
import { getDrivers } from '../../services/driverServiceApi.js';
import { getVehicles } from '../../services/vehicleServiceApi.js';

export default function AssignmentForm({ onSuccess }) {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const drv = await getDrivers();
        const veh = await getVehicles();
        setDrivers(drv);
        setVehicles(veh);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    }
    fetchData();
  }, []);

  const [formState, setFormState] = useState({
    driverId: '',
    vehicleId: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAssignment(formState);
      alert('Asignación creada con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear la asignación');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        Conductor
        <select
          name="driverId"
          value={formState.driverId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecciona un conductor</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>{`${d.id} - ${d.name}`}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Vehículo
        <select
          name="vehicleId"
          value={formState.vehicleId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecciona un vehículo</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{`${v.id} - ${v.plate}`}</option>
          ))}
        </select>
      </label>


      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </div>
    </form>
  );
}