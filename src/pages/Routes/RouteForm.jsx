import { useState } from 'react';
import { useEffect } from 'react';
import { createRoute } from '../../services/routeServiceApi.js'; 
import { getAssignments } from '../../services/assignmentServiceApi.js';
import { getCoordinates } from '../../services/coordinatesServiceApi.js';






export default function RouteForm({ onSuccess }) {
const [coordinates, setCoordinates] = useState([]);
const [assignments, setAssignments] = useState([]);


useEffect(() => {
  async function fetchData() {
    try {
      const coords = await getCoordinates();
      const assigns = await getAssignments();
      setCoordinates(coords);
      setAssignments(assigns);
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  }

    fetchData();
  }, []);


  const [formState, setFormState] = useState({
    name: '',
    travelDate: '',
    endLocationId: '',
    assignmentId: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createRoute(formState);
      alert('Ruta creada con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al crear la ruta');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">Nombre<input name="name" value={formState.name} onChange={handleChange} placeholder="Nombre" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Fecha de viaje<input type="date" name="travelDate" value={formState.travelDate} onChange={handleChange} placeholder="Fecha de viaje" required className="border p-2 rounded" /></label>
      <label className="flex flex-col">Identificador de destino
        <select
        name="endLocationId"
        value={formState.endLocationId}
        onChange={handleChange}
        required
        className="border p-2 rounded"
        >
        <option value="">Selecciona un destino</option>
        {coordinates.map(coord => (<option key={coord.id} value={coord.id}>{coord.id} - {coord.name ?? 'Destino'}</option>
        ))}
        </select>
      </label>
      <label className="flex flex-col">Identificador de asignación
        <select
        name="assignmentId"
        value={formState.assignmentId}
        onChange={handleChange}
        required
        className="border p-2 rounded"
        >
        <option value="">Selecciona una asignación</option>
        {assignments.map(assign => (<option key={assign.id} value={assign.id}>{assign.id} - {assign.name ?? 'Asignación'}</option>
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