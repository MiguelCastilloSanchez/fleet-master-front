import React from 'react';

function AssignmentItem({ assignment, setActiveForm, openConfirmation }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {assignment.id}</h4>
      <p>ID Conductor: {assignment.driverId}</p>
      <p>ID Vehículo: {assignment.vehicleId}</p>
      <p>Fecha de inicio: {assignment.startDate}</p>
      {assignment.endDate && <p>Fecha de fin: {assignment.endDate}</p>}

      <button
        onClick={() => setActiveForm('asignacionUpdate', assignment.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>
      <button
        onClick={() => openConfirmation('asignacion', assignment.id)}
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default AssignmentItem;