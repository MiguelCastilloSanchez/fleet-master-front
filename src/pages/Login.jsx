import { useState } from "react";
import { loginAdmin } from "../services/adminServiceApi.js";

function Login() {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginAdmin(formState);
            const token = result.token;
            localStorage.setItem("authToken", token);
            window.location.href = "/dashboard";
        } catch (err) {
            alert('Hubo un error al logear al administrador');
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-gray-50 rounded shadow ">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                <input className="border w-full mb-2 p-2 text-white" placeholder="Username" name="username" value={formState.username} onChange={handleChange} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Password" name="password" value={formState.password} type="password" onChange={handleChange} />
                <button className="bg-blue-600 text-white w-full py-2">Ingresar</button>
            </form>
            <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-medium text-gray-950 dark:text-white">¿No tiene cuenta?</span> entoces
                    <span className="font-medium text-gray-950 dark:text-white"><a href="/register"> Crear cuenta</a></span>
                </p>
            </div>
        </div>
    );
}

export default Login;
