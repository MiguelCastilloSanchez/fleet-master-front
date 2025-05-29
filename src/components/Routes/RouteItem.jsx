import React from 'react';



function DriverItem({ route, setActiveForm, openConfirmation }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {route.id}</h4>
      <p>Nombre: {route.name}</p>
      <p>Fecha de creación: {route.createdDate}</p>
      <p>Fecha de viaje: {route.travelDate}</p>
      <p>Identificador de lugar de salida: {route.startLocationId}</p>
      <p>Identificador de destino: {route.endLocationId}</p>
      <p>Identificador de asignación: {route.assignmentId}</p>
      <p>Identificador de vehículo: {route.vehicleId}</p>
      <p>Identificador de conductor: {route.driverId}</p>
      <p>Estado de ruta: {route.succesfulRoute ? "Exitosa" : "No exitosa"}</p>
      <p>Descripción de problemas: {route.problemdescription}</p>
     <p>Comentarios:</p>{route.commentaries.length > 0 ? (
        <ul className="list-inside">{route.commentaries.map((comentario, index) => (
            <li key={index}>{comentario}</li>))}
        </ul>  
        ) : (<p>Sin comentarios</p>)}
      <button 
        onClick={() => setActiveForm('rutaUpdate', route.id)} 
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>
      <button 
        onClick={() => openConfirmation('ruta', route.id)} 
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default DriverItem;