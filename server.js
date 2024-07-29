import express from "express";
import UserController from "./src/controllers/user-controller.js";
import EventController from "./src/controllers/event-controller.js";
import ProviciasController from "./src/controllers/provincias-controller.js"
import LocationsController from "./src/controllers/location-controller.js";
import EventCatController from "./src/controllers/event-category-controller.js"
import EventLocationController from "./src/controllers/event-location-controller.js";

const app = express(); // Inicia la API REST
app.use(express.json());
const port = 7777;
app.use("/api/event", EventController);
app.use("/api/province", ProviciasController);
app.use("/api/user", UserController);
app.use("/api/location", LocationsController);
app.use("/api/event-category", EventCatController)
app.use("/api/event-location", EventLocationController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
