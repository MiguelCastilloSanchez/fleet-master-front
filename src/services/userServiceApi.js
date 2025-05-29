const apiUrl = import.meta.env.VITE_API_URL;
const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
console.log('Class: userServiceApi');
console.log('Auth Token:', authToken);

export async function createUser(userData) {
  const response = await fetch(`${apiUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...userData,
    }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al crear el usuario');
  }

  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${apiUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar los usuarios');
  }

  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${apiUrl}/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el usuario');
  }

  return response.json();
}

export async function updateUser(userData) {
  const response = await fetch(`${apiUrl}/user/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...userData,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el usuario');
  }

  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${apiUrl}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el usuario');
  }

  return response.json();
}
