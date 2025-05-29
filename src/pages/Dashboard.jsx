import { useState, useEffect } from 'react';

import '../styles/Dashboard.css';
import Modal from './ModalForm';

import DriverForm from './Drivers/DriverForm';
import DriverUpdate from './Drivers/DriverUpdate';
import DriverItem from '.././components/Drivers/DriverItem.jsx';

import VehicleForm from './Vehicles/VehicleForm';
import VehicleUpdate from './Vehicles/VehicleUpdate';
import VehicleItem from '../components/Vehicles/VehicleItem.jsx';

import CoordinateForm from './Coordinates/CoordinateForm';
import CoordinateItem from '../components/Coordinates/CoordinateItem.jsx';

import AssignmentForm from './Assignment/AssignmentForm';
import AssignmentUpdate from './Assignment/AssignmentUpdate';

import RouteForm from './Routes/RouteForm';
import RouteUpdate from './Routes/RouteUpdate';
import RouteItem from '.././components/Routes/RouteItem.jsx'

import UserForm from './Users/UserForm';
import UserUpdate from './Users/UserUpdate';
import UserItem from '../components/Users/UserItem.jsx';

import { deleteDriver, getDrivers } from '../services/driverServiceApi.js';
import { deleteVehicle, getVehicles } from '../services/vehicleServiceApi.js';
import { deleteCoordinate, getCoordinates } from '../services/coordinatesServiceApi.js';
import { deleteRoute, getRoutes } from '../services/routeServiceApi.js';
import { deleteUser, getUsers } from '../services/userServiceApi.js';

import SearchForm from '../components/SearchForm.jsx';


function Dashboard() {
  const [todayUsers, setTodayUsers] = useState(0);
  const [todayRoutes, setTodayRoutes] = useState(0);
  const [todayVehicles, setTodayVehicles] = useState(0);
  const [todayDrivers, setTodayDrivers] = useState(0);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const entities = [
    { name: 'Conductores', label: 'Crear conductor', value: 'conductor' },
    { name: 'Vehículos', label: 'Crear vehículo', value: 'vehiculo' },
    { name: 'Destinos', label: 'Crear destino', value: 'destino' },
    { name: 'Asignaciones', label: 'Crear asignación', value: 'asignacion' },
    { name: 'Rutas', label: 'Crear ruta', value: 'ruta' },
    { name: 'Administradores', label: 'Opciones de administrador', value: 'admin' },
  ];

  const [activeForm, setActiveForm] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeEntity, setActiveEntity] = useState(null);


  const closeModal = () => setActiveForm(null);

  const handleClick = (formName) => {
    setActiveForm(formName);
  };

  const [selectedId, setSelectedId] = useState(null);
  const handleSetActiveForm = (formType, id = null) => {
    setActiveForm(formType);
    setSelectedId(id);
  };

  const openConfirmation = (tipo, id) => {
    setConfirmationModal({ abierto: true, tipo, id });
  };

  const [modalConfirmacion, setConfirmationModal] = useState({
    abierto: false,
    tipo: '',
    id: null,
  });

  const confirmDeletion = () => {
    const { tipo, id } = modalConfirmacion;
    borrarEntidad(tipo, id);
    setConfirmationModal({ abierto: false, tipo: '', id: null });
  };

  async function listarEntidades(entidad) {
    resetList();
    setActiveEntity(entidad);
    switch (entidad) {
      case 'vehiculo':
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
        return
      case 'conductor':
        const driversData = await getDrivers();
        setDrivers(driversData);
        return
      case 'destino':
        const coordinatesData = await getCoordinates();
        setCoordinates(coordinatesData);
        return
      case 'asignacion':
        alert('Listar' + entidad);
        return
      case 'ruta':
        const routesData = await getRoutes();
        setRoutes(routesData);
        return
      case 'admin':
        const usersData = await getUsers();
        setUsers(usersData);
        return
      default:
        return null;
    }
  }

  function resetList() {
    setDrivers([]);
    setVehicles([]);
    setCoordinates([]);
    setRoutes([]);
    setUsers([]);
  }

  const renderForm = () => {
    switch (activeForm) {
      case 'vehiculo':
        return <VehicleForm />;
      case 'conductor':
        return <DriverForm />;
      case 'destino':
        return <CoordinateForm />;
      case 'asignacion':
        return <AssignmentForm />;
      case 'ruta':
        return <RouteForm />;
      case 'admin':
        return <UserUpdate />;
      case 'vehiculoUpdate':
        return <VehicleUpdate vehicleId={selectedId}/>;
      case 'conductorUpdate':
        return <DriverUpdate driverId={selectedId} />;
      case 'asignacionUpdate':
        return <AssignmentUpdate />;
      case 'rutaUpdate':
        return <RouteUpdate routeId={selectedId} />;
      case 'adminUpdate':
        return <UserUpdate userId={selectedId}/>;
      default:
        return null;
    }
  };

  async function fetchSummaryData() {
    try {
      const [driversData, routesData, vehiclesData] = await Promise.all([
        getDrivers(),
        getRoutes(),
        1//getVehicles()
      ]);

      const today = new Date().toLocaleDateString('en-CA');
      console.log("todayLocal fecha: " + today);

      const driversCreatedToday = driversData.filter(driver => {
        return driver.systemEntryDate === today;
      });

      const routesCreatedToday = routesData.filter(route => {
        console.log("Ruta fecha: " + route.createdDate);
        return route.createdDate === today;
      });

      /*
      // Vehículos registrados hoy
      const vehiclesRegisteredToday = vehiclesData.filter(vehicle => {
        console.log("Vehículo fecha: " + vehicle.registrationDate);
        return vehicle.registrationDate === today;
      });
      setTodayVehicles(vehiclesRegisteredToday.length);
      */

      setTodayRoutes(routesCreatedToday.length);
      setTodayDrivers(driversCreatedToday.length);


    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

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
        <div className=" rounded-full bg-white dark:bg-gray-950">
          <div className="flex items-center justify-between gap-8 px-4 sm:px-6">
            <div className="flex items-center gap-6 overflow-x-auto p-1">
              {entities.map((form) => (
                <button
                  key={form.value}
                  onClick={() => handleClick(form.value)}
                  className="font-bold px-3 py-2 text-slate-700 rounded-lg bg-inherit hover:bg-slate-100 hover:text-slate-900 dark:text-white">
                  {form.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Usuarios creados" count={todayUsers} />
          <Card title="Viajes del día" count={todayRoutes} />
          <Card title="Vehículos creados" count={todayVehicles} />
          <Card title="Conductores creados" count={todayDrivers} />
        </div>
      </div>

      <Modal isOpen={!!activeForm} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 capitalize">Formulario de {activeForm}</h2>
        {renderForm()}
      </Modal>

      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_3fr] gap-4 items-start px-1'>
        <div id="filtros" className='bg-slate-100 w-fit mx-auto'>
          <h3>Listar entidades</h3>
          <ul>
            {entities.map((entitie) => (
              <button
                key={entitie.name}
                onClick={() => listarEntidades(entitie.value)}
                className="bg-blue-500 text-white px-4 py-2 rounded m-1 w-full">
                {entitie.name}
              </button>
            ))}
          </ul>
        </div>

        <div>
          <SearchForm
            activeEntity={activeEntity}
            setters={
              { conductor: setDrivers, vehiculo: setVehicles, destino: setCoordinates, ruta: setRoutes, administrador: setUsers }
            }
            resetList={resetList}
          />

          <div id="resultados" className='items-center justify-center p-4'>
            <ul id="lista-resultados" className="text-left">
              {drivers.length > 0 && (
                drivers.map((driver) => (
                  <DriverItem key={driver.id} driver={driver} setActiveForm={handleSetActiveForm} openConfirmation={openConfirmation} />
                ))
              )}
            </ul>
            <ul id="lista-resultados" className="text-left">
              {vehicles.length > 0 && (
                vehicles.map((vehicle) => (
                  <VehicleItem key={vehicle.id} vehicle={vehicle} setActiveForm={handleSetActiveForm} openConfirmation={openConfirmation} />
                ))
              )}
            </ul>
            <ul id="lista-resultados" className="text-left">
              {coordinates.length > 0 && (
                coordinates.map((coordinate) => (
                  <CoordinateItem key={coordinate.id} coordinate={coordinate} openConfirmation={openConfirmation} />
                ))
              )}
            </ul>
            <ul id="lista-resultados" className="text-left">
              {routes.length > 0 && (
                routes.map((route) => (
                  <RouteItem key={route.id} route={route} setActiveForm={handleSetActiveForm} openConfirmation={openConfirmation} />
                ))
              )}
            </ul>
            <ul id="lista-resultados" className="text-left">
              {users.length > 0 && (
                users.map((user) => (
                  <UserItem key={user.id} user={user} setActiveForm={handleSetActiveForm} openConfirmation={openConfirmation} />
                ))
              )}
            </ul>
          </div>
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

function borrarEntidad(tipo, id) {
  switch (tipo) {
    case 'vehiculo':
      deleteVehicle(id);
      return
    case 'conductor':
      deleteDriver(id);
      return
    case 'destino':
      deleteCoordinate(id);
      return
    case 'asignacion':
      alert('Borrar ' + tipo + ' con id: ' + id);
      console.log(`Eliminar ${tipo} con ID: ${id}`);
      return
    case 'ruta':
      deleteRoute(id);
      return
    case 'admin':
      deleteUser(id);
      return
    default:
      return null;
  }

}
