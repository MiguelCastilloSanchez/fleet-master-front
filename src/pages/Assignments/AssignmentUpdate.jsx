import { useState, useEffect } from 'react';
import { getAssignmentById, updateAssignment } from '../../services/assignmentServiceApi.js';
import { getDrivers } from '../../services/driverServiceApi.js';
import { getVehicles } from '../../services/vehicleServiceApi.js';

export default function AssignmentUpdate({ onSuccess, assignmentId }) {
  const [formState, setFormState] = useState({
    assignmentId: assignmentId,
    driverId: '',
    vehicleId: '',
  });
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [drvList, vehList] = await Promise.all([getDrivers(), getVehicles()]);
        setDrivers(drvList);
        setVehicles(vehList);
      } catch (err) {
        alert('Error cargando conductores o vehículos');
        console.error('Error cargando conductores o vehículos:', err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const assignment = await getAssignmentById(assignmentId);
        setFormState({
          assignmentId: assignment.id,
          driverId: assignment.driverId || '',
          vehicleId: assignment.vehicleId || '',
        });
      } catch (err) {
        alert('Error al cargar datos de la asignación');
        console.error('Error al cargar datos de la asignación:', err);
      }
    }
    if (assignmentId) fetchAssignment();
  }, [assignmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateAssignment(formState);
      alert('Asignación actualizada con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar la asignación');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.assignmentId}</label>

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
          {drivers.map(d => (
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
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{`${v.id} - ${v.plate}`}</option>
          ))}
        </select>
      </label>

      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Actualizar
        </button>
      </div>
    </form>
  );
}