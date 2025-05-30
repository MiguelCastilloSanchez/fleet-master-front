import { act, useState } from 'react';
import { getDriverById } from '../services/driverServiceApi';
import { getCoordinateById } from '../services/coordinatesServiceApi';
import { getRouteById } from '../services/routeServiceApi';
import { getVehicleById } from '../services/vehicleServiceApi';
import { getAssignmentById } from '../services/assignmentServiceApi';
import { getAdminById } from '../services/adminServiceApi';

const services = {
  getConductorById: getDriverById,
  getDestinoById: getCoordinateById,
  getRutaById: getRouteById,
  getVehiculoById: getVehicleById,
  getAsignacionById: getAssignmentById,
  getAdminById: getAdminById,
};

export default function SearchForm({ activeEntity, setters, resetList }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!activeEntity || !query.trim()) return;

    resetList();

    try {
      
      const functionName = `get${capitalize(activeEntity)}ById`;
      const getFunction = services[functionName];
      if (!getFunction) throw new Error(`Función no encontrada: ${functionName}`);

      const result = await getFunction(query.trim());
      const setter = setters[activeEntity];
      if (setter) setter([result]);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };


  //Se capitaliza debido a que la entidad llega con minúscula (EJ: conductor) pero el endpoint utiliza mayúscula
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    activeEntity && (
      <form onSubmit={handleSearch} className='bg-slate-200 p-2 rounded relative'>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 111.41-1.41l5.39 5.38-1.41 1.42-5.39-5.39zM8 14a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
            placeholder={`Buscar por ID de ${activeEntity}`}
            autoComplete="off"
          />
        </label>
      </form>
    )
  );
}
