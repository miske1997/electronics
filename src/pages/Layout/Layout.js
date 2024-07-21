import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./Layout.css"

function Layout() {
    return ( 
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
     );
}

export default Layout;