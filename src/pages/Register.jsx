import { useState } from "react";
import { createAdmin } from "../services/adminServiceApi.js";

function Register() {
    const [form, setForm] = useState({ email: "", password: "" });

    const [formState, setFormState] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        code: '',
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createAdmin(formState);
            alert('Usuario creado con éxito');
            window.location.href = "/login";
        } catch (err) {
            alert('Hubo un error al crear el administrador');
            console.error(err);
        }
    };



    return (
        <div className="w-full max-w-md p-6 bg-gray-50 rounded shadow ">
            <h1 className="text-2xl font-bold mb-4">Registrate</h1>
            <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                <input className="border w-full mb-2 p-2 text-white" placeholder="Username" name="username" value={formState.username} onChange={handleChange} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Password" name="password" value={formState.password} type="password" onChange={handleChange} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Name" name="name" value={formState.name} onChange={handleChange} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Email" name="email" value={formState.email} onChange={handleChange} />
                <input className="border w-full mb-2 p-2 text-white" placeholder="Code" name="code" value={formState.code} onChange={handleChange} />
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