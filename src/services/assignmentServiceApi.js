const apiUrl = import.meta.env.VITE_API_URL;

export async function getAssignments() {
  const response = await fetch(`${apiUrl}/assignment`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar las asignaciones');
  }
  return response.json();
}

export async function getAssignmentHistory() {
  const response = await fetch(`${apiUrl}/assignment/history`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar el historial de asignaciones');
  }
  return response.json();
}

export async function getAssignmentById(id) {
  const response = await fetch(`${apiUrl}/assignment/${id}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar la asignación');
  }
  return response.json();
}

export async function createAssignment(assignmentData) {
  const response = await fetch(`${apiUrl}/assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...assignmentData
    })
  });

  if (!response.ok) {
    throw new Error('Error al crear la asignación');
  }
  return response.json();
}

export async function updateAssignment(assignmentData) {
  const response = await fetch(`${apiUrl}/assignment/${assignmentData.assignmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...assignmentData
    })
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la asignación');
  }
  return response.json();
}

export async function deleteAssignment(id) {
  const response = await fetch(`${apiUrl}/assignment/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la asignación');
  }
  return response.json();
}

export async function getActiveAssignmentsByDriver(driverId) {
  const response = await fetch(`${apiUrl}/assignment/driver/${driverId}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar asignaciones activas del conductor');
  }
  return response.json();
}

export async function getDriverAssignmentHistory(driverId) {
  const response = await fetch(`${apiUrl}/assignment/driver/${driverId}/history`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar historial de asignaciones del conductor');
  }
  return response.json();
}

export async function getActiveAssignmentsByVehicle(vehicleId) {
  const response = await fetch(`${apiUrl}/assignment/vehicle/${vehicleId}`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar asignaciones activas del vehículo');
  }
  return response.json();
}

export async function getVehicleAssignmentHistory(vehicleId) {
  const response = await fetch(`${apiUrl}/assignment/vehicle/${vehicleId}/history`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al recuperar historial de asignaciones del vehículo');
  }
  return response.json();
}