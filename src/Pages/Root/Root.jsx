import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const Root = () => {
    return (
        <div>
            {/* <h1 className="text-center bg-amber-200">Navbar Here</h1> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;