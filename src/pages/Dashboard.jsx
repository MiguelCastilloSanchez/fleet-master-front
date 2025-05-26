import '../styles/Dashboard.css';
import Modal from './ModalForm';
import DriverForm from './Drivers/DriverForm';
import VehicleForm from './Vehicles/VehicleForm';
import CoordinateForm from './Coordinates/CoordinateForm';
import AssignmentForm from './Assignment/AssignmentForm';
import RouteForm from './Routes/RouteForm';
import UserForm from './Users/UserForm';

function Dashboard() {

  const [activeForm, setActiveForm] = useState(null);

  const closeModal = () => setActiveForm(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear el registro
    closeModal();
  };

  const [modalConfirmacion, setConfirmationModal] = useState({
    abierto: false,
    tipo: '',
    id: null,
  });

  const openConfirmation = (tipo, id) => {
    setConfirmationModal({ abierto: true, tipo, id });
  };

  const confirmDeletion = () => {
    const { tipo, id } = modalConfirmacion;
    // Eliminar el registro según tipo e id
    console.log(`Eliminar ${tipo} con ID: ${id}`);
    setConfirmationModal({ abierto: false, tipo: '', id: null });
  };



  const renderForm = () => {
    switch (activeForm) {
      case 'vehiculo':
        return <VehicleForm onSubmit={handleSubmit} />;
      case 'conductor':
        return <DriverForm onSubmit={handleSubmit} />;
      case 'destino':
        return <CoordinateForm onSubmit={handleSubmit} />;
      case 'asignacion':
        return <AssignmentForm onSubmit={handleSubmit} />;
      case 'ruta':
        return <RouteForm onSubmit={handleSubmit} />;
      case 'admin':
        return <UserForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className='flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800'>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </header>
      <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
        <div className="bg-white dark:bg-gray-950">
          <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <a className="shrink-0" aria-label="Home" href="/">Fleet Master</a>
            </div>
            <div className="flex items-center gap-6">
              <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">Docs</a>
              <a className="text-sm/6 text-gray-950 dark:text-white" href="/blog">Blog</a>
              <a className="text-sm/6 text-gray-950 dark:text-white" href="/showcase">Showcase</a>
              <a aria-label="GitHub repository" href="">
                <span className="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">
                  <svg className="size-6 stroke-pink-700 dark:stroke-pink-500"></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="inset-x-0 border-b border-gray-950/5 dark:border-white/10 m-4">
        <div className=" rounded-lg bg-white dark:bg-gray-950">
          <div className="flex items-center justify-between gap-8 px-4 sm:px-6">
            <div className="flex items-center gap-6 overflow-x-auto p-5">
              <button onClick={() => setActiveForm('conductor')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Crear conductor</button>
              <button onClick={() => setActiveForm('vehiculo')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Crear vehículo</button>
              <button onClick={() => setActiveForm('destino')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Crear destino</button>
              <button onClick={() => setActiveForm('asignacion')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Crear asignación</button>
              <button onClick={() => setActiveForm('ruta')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Crear ruta</button>
              <button onClick={() => setActiveForm('admin')} className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">Opciones de administrador</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Usuarios creados" count={10} />
          <Card title="Viajes del día" count={5} />
          <Card title="Vehículos creados" count={7} />
          <Card title="Conductores creados" count={3} />
        </div>
      </div>


      <Modal isOpen={!!activeForm} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 capitalize">Formulario de {activeForm}</h2>
        {renderForm()}
      </Modal>


      <form id="search-form">
        <input type="text" className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder="Busca aquí..." autoComplete="off"></input>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
        </label>
        <select className='"w-full px-4 py-2 mx-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
          <option value="opcion1">Por nombre</option>
          <option value="opcion2" selected>Por id</option>
        </select>
      </form >

      <main>
        <div id="resultados" className='items-center justify-center p-4'>
          <ul id="lista-resultados" className="text-left">
            <li>
              <h4>Nombre: Ejemplo Driver</h4>
              <p>Fecha de Nacimiento: 1988-11-10</p>
              <p>Curp: TOAA881110MDFRNR08</p>
              <p>Dirección: Av. Tecnológico #456, Mérida, Yucatán</p>
              <p>Salario: 13500.50</p>
              <p>Número de Licencia: 1234567891</p>
              <p>Fecha de entrada al sistema: 2024-01-12</p>
              <button onClick={() => setActiveForm('conductor')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('conductor', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
            <li>
              <h4>Marca: Ejemplo Vehículo</h4>
              <p>vin: 3N1AB7AP6KY321456</p>
              <p>Matrícula: YUC5678</p>
              <p>Fecha de compra: 2022-10-10</p>
              <p>Costo: 220000.00</p>
              <p>photoUrl: https://example.com/photos/nissan.jpg</p>
              <p>Fecha de registro: 2022-10-15</p>
              <button onClick={() => setActiveForm('vehiculo')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('vehiculo', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
            <li>
              <h4>Nombre: Ejemplo Coordenada</h4>
              <p>Latitud: 40.967370</p>
              <p>Altitud: 40.967370</p>
              <button onClick={() => setActiveForm('destino')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('destino', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
            <li>
              <h4>Nombre: Ejemplo Asignación</h4>
              <p>driverId: 1</p>
              <p>vehicleId: 1</p>
              <p>Fecha de asignación: 2025-04-29</p>
              <button onClick={() => setActiveForm('asignacion')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('asignacion', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
            <li>
              <h4>Nombre: Ejemplo Ruta</h4>
              <p>Fecha de Viaje: 2029-10-10</p>
              <p>Destino: NOMBRE COORDENADA</p>
              <p>Conductor: NOMBRE CONDUCTOR</p>
              <p>Vehículo: NOMBRE VEHÍCULO</p>
              <button onClick={() => setActiveForm('ruta')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('ruta', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
            <li>
              <h4>Nombre: Ejemplo Admin</h4>
              <button onClick={() => setActiveForm('admin')} className="bg-blue-500 text-white px-4 py-2 rounded mx-3">Editar</button>
              <button onClick={() => openConfirmation('admin', 1)} className="text-red-600 hover:underline mx-3">Eliminar</button>
            </li>
          </ul>

        </div>

        <Modal isOpen={modalConfirmacion.abierto} onClose={() => setConfirmationModal({ abierto: false, tipo: '', id: null })}>
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">¿Estás seguro?</h2>
            <p>Se eliminará el {modalConfirmacion.tipo} con ID <strong>{modalConfirmacion.id}</strong>.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeletion}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmationModal({ abierto: false, tipo: '', id: null })}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </main>

    </>
  );
}

function Card({ title, count }) {
  return (
    <>
      <button type='button' className="border-solid hover:border-dotted hover:border-white border-2 border-blue-700 bg-white dark:bg-indigo-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl">{count}</p>
      </button>

    </>
  );
}

export default Dashboard;

import React, { useState } from 'react';


