import express from "express";
import cors from "cors";
import UserController from "./src/controllers/user-controller.js";

const app = express(); // Inicia la API REST
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use(cors(corsOptions)); // Usa el middleware cors con opciones
app.use(express.json());
const port = 7777;
app.use("/api/user", UserController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
