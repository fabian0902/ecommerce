import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GLobalState";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../utils/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: "",
  description: "",
  content: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
  const param = useParams();

  const [products] = state.ProductsAPI.products;
  const [onEdit, setOnedit] = useState(false);
  const [callback, setCallback] = state.ProductsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnedit(true);

      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnedit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("No eres admin");
      const file = e.target.files[0];
      if (!file) return alert("No archivo");
      if (file.size > 1024 * 1024) alert("Demasiado grande");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        alert("El formato es incorrecto");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("No eres admin");
      if (!images) return alert("no hay imagen");
      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);
      navigate({ pathname: "/" });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <span onClick={handleDestroy}> x </span>
            <img src={images ? images.url : ""} alt="" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="create_form">
        <div className="row">
          <label htmlFor="product_id">ID DEL PRODUCTO</label>
        </div>
        <input
          type="text"
          name="product_id"
          id="product_id"
          required
          value={product.product_id}
          onChange={handleChangeInput}
        />

        <div className="row">
          <div>
            <label htmlFor="title">TITULO</label>
          </div>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={product.title}
          onChange={handleChangeInput}
        />

        <div className="row">
          <div>
            <label htmlFor="price">PRECIO</label>
          </div>
        </div>
        <input
          type="number"
          name="price"
          id="price"
          required
          value={product.price}
          onChange={handleChangeInput}
        />

        <div className="row">
          <div>
            <label htmlFor="description">DESCRIPCION DEL PRODUCTO</label>
          </div>
        </div>
        <textarea
          type="text"
          name="description"
          id="description"
          required
          value={product.description}
          onChange={handleChangeInput}
        />

        <div className="row">
          <div>
            <label htmlFor="content">CONTENIDO</label>
          </div>
        </div>
        <textarea
          type="text"
          name="content"
          id="content"
          required
          value={product.content}
          onChange={handleChangeInput}
        />

        <button type="submit">{onEdit ? "Update" : "CREAR PRODUCTO"} </button>
      </form>
    </div>
  );
}

export default CreateProduct;