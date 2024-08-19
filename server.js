import express from "express";
import cors from "cors";
import UserController from "./src/controllers/user-controller.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express(); // Inicia la API REST
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use(cors(corsOptions)); // Usa el middleware cors con opciones
app.use(express.json());

app.use(express.static(path.join(__dirname, 'my-app', 'build')));
app.use('/static', express.static(path.join(__dirname, 'my-app', 'src', 'components', 'img')));

const port = 7777;
app.use("/api/user", UserController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app', 'build', 'index.html'));
});
