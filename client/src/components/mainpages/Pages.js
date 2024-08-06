import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalState } from "../../GLobalState";
import NotFound from "./utils/NotFound";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateProduct from "./createProduct/CreateProduct";
import Products from "./products/Products";

function Pages() {
  

  return (
    <Routes>
      <Route path="*" element={<Products />} />
      <Route path="*" element={"FABIAN FERNANDEZ"} />
    </Routes>
  );
}

export default Pages;