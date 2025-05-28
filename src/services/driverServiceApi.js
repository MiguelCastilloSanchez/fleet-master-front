// src/services/driverServiceApi.js
const apiUrl = import.meta.env.VITE_API_URL;


export async function createDriver(driverData) {
  const response = await fetch(`${apiUrl}/driver`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...driverData,
      salary: parseFloat(driverData.salary),
    }),
  });

  if (!response.ok) {
    throw new Error('Error al crear el conductor');
  }

  return response.json();
}

export async function getDrivers(){
    const response = await fetch(`${apiUrl}/driver`,{
        method: 'GET',
        
    });

    if (!response.ok){
        throw new Error('Error al recuperar los conductores');
    }
    return response.json();
}

export async function updateDriver(driverData) {
  const response = await fetch(`${apiUrl}/driver/${driverData.id}`,{
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...driverData,
    }),
  });
    if (!response.ok){
        throw new Error('Error al actualizar el conductor');
    }
    return response.json();

}

export async function getDriverById(id) {
  const response = await fetch(`${apiUrl}/driver/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el conductor');
  }
  return response.json();
}

export async function deleteDriver(id){
  const response = await fetch(`${apiUrl}/driver/${id}`, {
    method: 'DELETE',
  });
}
