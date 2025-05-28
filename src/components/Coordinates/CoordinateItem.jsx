import React from 'react';



function CoordinateItem({ coordinate, openConfirmation }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {coordinate.id}</h4>
      <p>Nombre: {coordinate.name}</p>
      <p>Latitud: {coordinate.latitude}</p>
      <p>Altitud: {coordinate.altitude}</p>
      <button 
        onClick={() => openConfirmation('destino', coordinate.id)} 
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default CoordinateItem;