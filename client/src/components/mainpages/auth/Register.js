import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const onChangeInput = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>REGISTRO DE USUARIO</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Nombre"
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row"></div>
        <button type="submit"> Registrar</button>
        <Link  to={"/login"} > Login</Link>

      </form>
    </div>
  );
}

export default Register;