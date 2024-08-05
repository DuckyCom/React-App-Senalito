import express from "express";
import {UserService} from "../service/user-service.js";
import e from "express";
const router = express.Router();
const userService = new UserService();

/* PUNTO 6: Autenticacion de Usuarios */
router.post("/login", async (req, res) => {
    try {
        const { first_name, password } = req.body;
        const result = await userService.verificacionUsuario(first_name, password);
        console.log(result, "Tene un buen dia ;)")

        if (result) {
            const { user, token } = result;  // Desestructura el objeto para obtener el usuario y el token
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie de una hora
            res.cookie('userId', user.id, { httpOnly: true, maxAge: 3600000 });
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});


router.post("/register", async (req, res) => {
    const { first_name, username, email, password } = req.body;
    console.log(req.body, "ESTO ESTA PASANDO EN USER-CONTROLLER (sabias que el gris es considerado un color 'sin color'? Que loco")
    const crearUsuario = verificadorDeRegistro(first_name, username, email, password);
    console.log(crearUsuario)
    if(crearUsuario === true){
        let idUser;
        idUser = await userService.crearUsuario(first_name, username, email, password)
        if(idUser != NaN){
            res.json({success: true});
            //esto es mas que nada para postman

            // return res.status(201).send({
            //     id: idUser,
            //     first_name: first_name,
            //     username: username,
            //     email: email,
            //     message: 'User registered successfully',
            // });
            
        } else {
            return res.status(400).send("first_name ya existente");
        }    
    } else {
        return res.status(400).send(crearUsuario);
    }
});

const verificadorDeRegistro = (first_name, username, email, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!first_name || !username){
        return "El nombre y apellido son obligatorios";
    }
    else if(!regex.test(email)){
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


