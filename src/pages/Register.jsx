import { useState } from "react";

function Register() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.location.href = "/dashboard";
        //Manejar lógica de registro
    };

    return (
        <div className="w-full max-w-md p-6 bg-gray-50 rounded shadow ">
            <h1 className="text-2xl font-bold mb-4">Registrate</h1>
            <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                <input className="border w-full mb-2 p-2 text-white" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button className="bg-green-600 text-white w-full py-2">Register</button>
            </form>
            <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-medium text-gray-950 dark:text-white">¿Ya tienes cuenta?</span> entoces
                    <span className="font-medium text-gray-950 dark:text-white"><a href="/login"> Iniciar sesión</a></span>
                </p>
            </div>
        </div>
    );
}

export default Register;