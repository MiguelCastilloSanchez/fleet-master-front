const apiUrl = import.meta.env.VITE_API_URL;
const apiAuthUrl = import.meta.env.VITE_API_AUTH_URL;
const authToken = localStorage.getItem('authToken');
console.log('Class: adminServiceApi');
console.log('Auth Token:', authToken);

export async function createAdmin(adminData) {
  var body_test = JSON.stringify({
    username: adminData.username,
    password: adminData.password,
    name: adminData.name,
    email: adminData.email,
    code: adminData.code
  });
  console.log("body_test Data: %o", body_test);
  const response = await fetch(`${apiAuthUrl}/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body_test,
  });

  if (!response.ok) {
    throw new Error('Error al crear el Administrador');
  }

  return response.json();
}

export async function loginAdmin(adminData) {
  var body_test = JSON.stringify({
    username: adminData.username,
    password: adminData.password
  });
  console.log("body_test Data: %o", body_test);
  const response = await fetch(`${apiAuthUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body_test
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  return response.json();
}

export async function deleteAdmin(id) {
  const response = await fetch(`${apiAuthUrl}/admin/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el administrador');
  }

  return response.json();
}

export async function updateAdmin(adminData) {
  const response = await fetch(`${apiAuthUrl}/admin/${adminData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...adminData,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el administrador');
  }

  return response.json();
}

export async function getAdminById(id) {
  const response = await fetch(`${apiAuthUrl}/admin/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el admin');
  }

  return response.json();
}

export async function getAdmins() {
  const response = await fetch(`${apiAuthUrl}/admin`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar los admins');
  }
  return response.json();
}