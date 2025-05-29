const apiUrl = import.meta.env.VITE_API_URL;
const apiAuthUrl = import.meta.env.VITE_API_AUTH_URL;

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
    body: body_test
  });

  if (!response.ok) {
    throw new Error('Error al crear el Administrador');
  }

  return response.json();
}
