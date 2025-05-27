import { useState } from "react";

function Login({ setAuth }) {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.location.href = "/dashboard";
        //Manejar lógica de autenticación
    };

    return (
        <div className="w-full max-w-md p-6 bg-gray-50 rounded shadow ">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                <input className="border w-full mb-2 p-2 dark:text-white" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="border w-full mb-2 p-2 dark:text-white" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
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
