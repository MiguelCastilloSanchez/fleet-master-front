import { act, useState } from 'react';
import { getDriverById } from '../services/driverServiceApi';
import { getCoordinateById } from '../services/coordinatesServiceApi';

const SearchForm = ({ activeEntity, setDrivers, setCoordinates, resetList }) => {
  const [query, setQuery] = useState('');
    
  const handleSearch = async (e) => {
    resetList();
    e.preventDefault();
    if (!query.trim()) return;

    switch (activeEntity) {
      case 'conductor':
        try {
          const result = await getDriverById(query.trim());
          setDrivers(result ? [result] : []);
        } catch (err) {
          console.error('Error al buscar conductor:', err);
        }
        break;

      case 'destino':
        try {
          const result = await getCoordinateById(query.trim());
          setCoordinates(result ? [result] : []);
        } catch (err) {
          console.error('Error al buscar coordenada:', err);
        }
        break;

      default:
        alert('Buscar no está disponible para esta entidad.');
        break;
    }
  };
  if(!activeEntity) return null;
  
  return (
    
    <form id="search-form" onSubmit={handleSearch} className='bg-slate-200 p-2 rounded'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          placeholder={`Buscar por ID de ${activeEntity}`}
          autoComplete="off"
        />
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
      </label>
    </form>
  );
};


export default SearchForm;
