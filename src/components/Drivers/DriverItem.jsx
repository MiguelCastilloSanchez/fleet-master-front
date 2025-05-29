import React from 'react';



function DriverItem({ driver, setActiveForm, openConfirmation, listarEntidades }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {driver.id}</h4>
      <p>Nombre: {driver.name}</p>
      <p>Fecha de Nacimiento: {driver.birthDate}</p>
      <p>Curp: {driver.curp}</p>
      <p>Dirección: {driver.address}</p>
      <p>Salario: {driver.salary}</p>
      <p>Número de Licencia: {driver.licenseNumber}</p>
      <p>Fecha de entrada al sistema: {driver.systemEntryDate}</p>
      <button 
        onClick={() => setActiveForm('conductorUpdate', driver.id)} 
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>

      <button
       onClick={() => listarEntidades('asignacion', true, driver.id, null)} 
       className="bg-orange-500 text-white px-2 py-2 rounded mx-3"
      >
        Asignación activa
      </button>


      <button
       onClick={() => listarEntidades('asignacion', false, driver.id)} 
       className="bg-orange-500 text-white px-4 py-2 rounded mx-3"
      >
        Historial de asignaciones
      </button>
      <button 
        onClick={() => openConfirmation('conductor', driver.id)} 
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>


    </li>
  );
}

export default DriverItem;