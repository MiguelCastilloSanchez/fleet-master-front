import React from 'react';

function VehicleItem({ vehicle, setActiveForm, openConfirmation, listarEntidades }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {vehicle.id}</h4>
      <p>Marca: {vehicle.brand}</p>
      <p>VIN: {vehicle.vin}</p>
      <p>Placa: {vehicle.plate}</p>
      <p>Fecha de compra: {vehicle.purchaseDate}</p>
      <p>Costo: {vehicle.cost}</p>
      {vehicle.photoUrl && (
        <p>
          Foto: <a href={vehicle.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver foto</a>
        </p>
      )}
      <p>Fecha de registro: {vehicle.registrationDate}</p>
      <button
        onClick={() => setActiveForm('vehiculoUpdate', vehicle.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>

      <button
       onClick={() => listarEntidades('asignacion', true, null, vehicle.id)} 
       className="bg-orange-500 text-white px-2 py-2 rounded mx-3"
      >
        Asignación activa
      </button>

      <button
       onClick={() => listarEntidades('asignacion', false, null, vehicle.id)} 
       className="bg-orange-500 text-white px-2 py-2 rounded mx-3"
      >
        Historial de asignaciones
      </button>

      <button
        onClick={() => openConfirmation('vehiculo', vehicle.id)}
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default VehicleItem;