require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
//import connectDB from "./config/database";

const app = express();

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Crear una configuracion de cors
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//rutas
app.use("/user", require("./routes/users.routes"));
app.use("/api", require("./routes/upload.routes"));
app.use("/api", require("./routes/products.routes"));
///ESTE ES LO QUE ESTA FUNCIONANDO
//const uri = 'mongodb+srv://fabian0902:gato*159753FFF@sport.w15bpix.mongodb.net/?retryWrites=true&w=majority&appName=sport';
const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?appName=${process.env.DB_CLUSTER}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose
.connect(uri)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});