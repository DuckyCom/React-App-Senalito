import express from "express";
import {UserService} from "../service/user-service.js";
import e from "express";
const router = express.Router();
const userService = new UserService();

/* PUNTO 6: Autenticacion de Usuarios */
router.post("/login", async (req, res) => {
    const { first_name, password } = req.body;
    if (first_name && password) {
        try {
            const token = await userService.verificacionUsuario(first_name, password);
            if (token) {
                return res.status(200).send({
                    success: true,
                    message: "User Found",
                    token: token
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: "username or password invalid",
                    token: ""
                });
            }
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    } else {
        return res.status(400).send({
            success: false,
            message: "username and password are required"
        });
    }
});


// MENSAJE PARA EL PROFE: HOLA, SOY NOAH, TE QUERIA DECIR QUE HAY UN BUG/ERROR CON EL CREAR QUE TENES QUE TOCAR "SEND" 3 VECES PARA QUE TE TOME EL ID=3 (ya que hay ya existentes 2 users anteriores)
router.post("/register", async (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const userService = new UserService();
    const crearUsuario = verificadorDeRegistro(first_name, last_name, first_name, password);
    if(crearUsuario === true){
        if(await userService.crearUsuario(first_name, last_name, username, password)){
            return res.status(201).send({
                id: 0,
                first_name: first_name,
                last_name: last_name,
                username: username,
                message: 'User registered successfully',
            });
        } else {
            return res.status(400).send("first_name ya existente");
        }    
    } else {
        return res.status(400).send(crearUsuario);
    }
});

const verificadorDeRegistro = (first_name, last_name, username, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!first_name || !last_name){
        return "El nombre y apellido son obligatorios";
    }
    else if(!regex.test(username)){
        return "El formato de correo electrónico no es válido";
    }
    else if(password.length < 3){
        return "La contraseña debe tener al menos 3 caracteres";
    }
    else{
        return true;
    }
}


export default router;


