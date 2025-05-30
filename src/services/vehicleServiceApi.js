const apiUrl = import.meta.env.VITE_API_URL;
const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
console.log('Class: VehicleServiceApi');
console.log('Auth Token:', authToken);

export async function createVehicle(vehicleData) {
  const response = await fetch(`${apiUrl}/vehicle`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...vehicleData,
    }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al crear el vehículo');
  }

  return response.json();
}

export async function getVehicles() {
  const response = await fetch(`${apiUrl}/vehicle`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar los vehículos');
  }

  return response.json();
}

export async function getVehicleById(id) {
  const response = await fetch(`${apiUrl}/vehicle/${id}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el vehículo');
  }

  return response.json();
}

export async function updateVehicle(vehicleData) {
  const response = await fetch(`${apiUrl}/vehicle/${vehicleData.id}`, {
    method: 'PUT',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      ...vehicleData,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el vehículo');
  }

  return response.json();
}

export async function deleteVehicle(id) {
  const response = await fetch(`${apiUrl}/vehicle/${id}`, {
    method: 'DELETE',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el vehículo');
  }

  return response.json();
}
