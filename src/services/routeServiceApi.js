const apiUrl = import.meta.env.VITE_API_URL;


export async function createRoute(routeData) {
  const response = await fetch(`${apiUrl}/route`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...routeData,
    }),
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
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
    },
  });
}