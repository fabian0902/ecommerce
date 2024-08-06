import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const viewDetail = async (product)=>{
    if(!isLogged) return alert("Por favor logeate para continuar")
    if(isLogged){
      await axios.get(`/detail/:${product._id}`,
      {
        headers: {Authorization: token}
      })
    }
  }
  
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    viewDetail: viewDetail
  };
}

export default UserAPI;