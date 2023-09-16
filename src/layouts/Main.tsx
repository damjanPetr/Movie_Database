import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Main() {
  return (
    <div className="">
      <Header />
      <div className=" mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
