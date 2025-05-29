const apiUrl = import.meta.env.VITE_API_URL;
const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
console.log('Class: routeServiceApi');
console.log('Auth Token:', authToken);

export async function createRoute(routeData) {
  const response = await fetch(`${apiUrl}/route`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...routeData,
    }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al crear la ruta');
  }

  return response.json();
}

export async function getRoutes() {
  const response = await fetch(`${apiUrl}/route`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar las rutas');
  }
  return response.json();
}

export async function updateRoute(routeData) {
  const response = await fetch(`${apiUrl}/route/${routeData.id}`, {
    method: "PUT",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...routeData,
    }),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la ruta');
  }
  return response.json();

}

export async function getRouteById(id) {
  const response = await fetch(`${apiUrl}/route/${id}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar la ruta');
  }
  return response.json();
}

export async function deleteRoute(id) {
  const response = await fetch(`${apiUrl}/route/${id}`, {
    method: 'DELETE',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });
}