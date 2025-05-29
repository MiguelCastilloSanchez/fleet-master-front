import React from 'react';



function UserItem({ user, setActiveForm, openConfirmation }) {
  return (
    <li className="mb-4 p-4 bg-white rounded-lg shadow">
      <h4 className="font-bold">ID: {user.id}</h4>
      <p>Username: {user.username}</p>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      <button 
        onClick={() => setActiveForm('userUpdate', user.id)} 
        className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
      >
        Editar
      </button>
      <button 
        onClick={() => openConfirmation('user', user.id)} 
        className="text-red-600 hover:underline mx-3"
      >
        Eliminar
      </button>
    </li>
  );
}

export default UserItem;