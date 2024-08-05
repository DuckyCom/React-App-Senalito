import express from "express";
import {UserService} from "../service/user-service.js";
import e from "express";
const router = express.Router();
const userService = new UserService();

/* PUNTO 6: Autenticacion de Usuarios */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.verificacionUsuario(email, password);
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
    const { first_name, phone_number, email, password } = req.body;
    console.log(req.body, "ESTO ESTA PASANDO EN USER-CONTROLLER (sabias que el gris es considerado un color 'sin color'? Que loco")
    const crearUsuario = verificadorDeRegistro(first_name, phone_number, email, password);
    console.log(crearUsuario)
    if(crearUsuario === true){
        let idUser;
        idUser = await userService.crearUsuario(first_name, phone_number, email, password)
        if(idUser != NaN){
            res.json({success: true});
        } else {
            return res.status(400).send("Usuario con datos ya existentes o datos incorrectos");
        }    
    } else {
        return res.status(400).send(crearUsuario);
    }
});

const verificadorDeRegistro = (first_name, phone_number, email, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Ajusta según el formato deseado
    if(!first_name || !phone_number){
        return "El nombre y el número de teléfono son obligatorios";
    }
    else if(!phoneRegex.test(phone_number)){
        return "El número de teléfono no es válido";
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


