import React, { useContext, useState } from "react";
import { GlobalState } from "../../GLobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import { Link } from "react-router-dom";
import axios from "axios";


function Header() {
  const state = useContext(GlobalState);

  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firsLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to={"/create_products"}>CREAR PRODUCTO</Link>
        </li>
        
      </>
    )
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to={"/"} onClick={logoutUser}>CERRAR SESION</Link>
        </li>
      </>
    );
  };

  

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to={"/"}>{isAdmin ? "Admin" : "SHOP"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to={"/"}>{isAdmin ? "Products" : "SHOP"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to={"/login"}>LOGUEARSE O REGISTRARSE</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

    
    </header>
  );
}

export default Header;