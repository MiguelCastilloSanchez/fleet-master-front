import { useState, useEffect } from 'react';
import { getRouteById, updateRoute } from '../../services/routeServiceApi.js'; 
import { getCoordinates } from '../../services/coordinatesServiceApi.js';

export default function RouteForm({ onSuccess, routeId }) {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    problemDescription: '',
    commentaries: '',        
    travelDate: '',
    succesfulRoute: '',
    endLocationId: '',
  });

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routeResult = await getRouteById(routeId);
        setFormState({
          id: routeResult.id,
          name: routeResult.name,
          problemDescription: routeResult.problemdescription,
          commentaries: '',
          travelDate: routeResult.travelDate,
          succesfulRoute: routeResult.succesfulRoute,
          endLocationId: routeResult.endLocationId,
        });
      } catch (err) {
        console.error('Error al cargar datos de la ruta:', err);
      }
    };

    if (routeId) {
      fetchData();
    }
  }, [routeId]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await getCoordinates();
        setCoordinates(coords);
      } catch (err) {
        console.error('Error al obtener coordenadas:', err);
      }
    };

    fetchCoordinates();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const result = await updateRoute(formState);
      alert('Ruta actualizada con éxito');
      onSuccess?.(result);
    } catch (err) {
      alert('Hubo un error al actualizar la ruta');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-bold">ID: {formState.id}</label>

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
        Descripción del problema
        <textarea
          name="problemDescription"
          value={formState.problemDescription}
          onChange={handleChange}
          placeholder="Descripción del problema"
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
  Nuevo comentario
  <textarea
    name="commentaries"
    value={formState.commentaries}
    onChange={handleChange}
    placeholder="Escribe un nuevo comentario"
    className="border p-2 rounded"
  />
</label>

      <label className="flex flex-col">
        Fecha de viaje
        <input
          type="date"
          name="travelDate"
          value={formState.travelDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Ruta exitosa
        <select
          name="succesfulRoute"
          value={formState.succesfulRoute}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecciona...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </label>

      <label className="flex flex-col">
        ID de destino
        <select
          name="endLocationId"
          value={formState.endLocationId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecciona una coordenada</option>
          {coordinates.map(coord => (
            <option key={coord.id} value={coord.id}>
              {`${coord.id} ${coord.name}`}
            </option>
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