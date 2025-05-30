import React from 'react';



function AdminItem({ admin, setActiveForm, openConfirmation }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {admin.id}</h4>
      <p>Nombre: {admin.name}</p>
      <p>Correo: {admin.email}</p>
      <p>Nombre de usuario: {admin.username}</p>
        <button 
        onClick={() => setActiveForm('adminUpdate', admin.id)} 
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>

      <button 
        onClick={() => openConfirmation('admin', admin.id)} 
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default AdminItem;