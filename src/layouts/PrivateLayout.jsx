import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <>
      <div className="inset-x-0 h-screen">

        <Outlet />
      </div>
    </>
  );
}
