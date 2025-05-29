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
        throw new Error('Error al recuperar los viajes');
    }
    return response.json();
}