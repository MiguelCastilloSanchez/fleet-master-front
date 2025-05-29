const apiUrl = import.meta.env.VITE_API_URL;
const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
console.log('Class: CoordinatesServiceApi');
console.log('Auth Token:', authToken);

export async function createCoordinate(coordinateData) {
  const response = await fetch(`${apiUrl}/coordinate`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...coordinateData,
      latitude: parseFloat(coordinateData.latitude),
      longitude: parseFloat(coordinateData.longitude),
    }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al crear la coordenada');
  }

  return response.json();
}

export async function getCoordinates() {
  const response = await fetch(`${apiUrl}/coordinate`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }

  });

  if (!response.ok) {
    throw new Error('Error al recuperar las coordenadas');
  }
  return response.json();
}

export async function updateCoordinate(coordinateData) {
  const response = await fetch(`${apiUrl}/coordinate/${coordinateData.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...coordinateData,
    }),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la coordenada');
  }
  return response.json();

}

export async function getCoordinateById(id) {
  const response = await fetch(`${apiUrl}/coordinate/${id}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el la coordenada');
  }
  return response.json();
}

export async function deleteCoordinate(id) {
  const response = await fetch(`${apiUrl}/coordinate/${id}`, {
    method: 'DELETE',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });
}
