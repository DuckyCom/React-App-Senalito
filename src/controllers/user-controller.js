import express from "express";
import { UserService } from "../service/user-service.js";
import e from "express"; 
const router = express.Router();
const userService = new UserService();
 
/* PUNTO 6: Autenticacion de Usuarios */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("LA PASSWORD ", password);
        const result = await userService.verificarUsuario(email, password);
        console.log(result, "Tene un buen dia ;)");

        if (result) {
            const user = result.usuario
            const token = result.token  // Desestructura el objeto para obtener el usuario y el token
            console.log("ME-WOW IS THAT THE LATEST FELINOR FASHION?", user)
            res.json({ success: true, result: { user, token } });
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
    console.log(req.body, "ESTO ESTA PASANDO EN USER-CONTROLLER (sabias que el gris es considerado un color 'sin color'? Que loco)");
    const crearUsuario = await verificadorDeRegistro(first_name, phone_number, email, password);
    console.log(crearUsuario);
    if (crearUsuario === true) {
        let idUser;
        idUser = await userService.crearUsuario(first_name, phone_number, email, password);
        if (idUser != NaN) {
            res.json({ success: true });
        } else {
            return res.status(400).send("Usuario con datos ya existentes o datos incorrectos");
        }
    } else {
        return res.status(400).send(crearUsuario);
    }
});

const verificadorDeRegistro = (first_name, phone_number, email, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex para validar números de teléfono con cualquier prefijo internacional y código de área
    const phoneRegex = /^\+\d{1,3}[ \-]?\(?\d{1,4}\)?[ \-]?\d{4}[ \-]?\d{4}$/; // El + se acompaña con entre 1 y 3 digitos porque puede variar según el código de area. Después el 11 lo mismo, entre 1 y 4 numeros por el código de area, y después bueno, 4 números. Permite que se acompañe o no de guiones
    
    if (!first_name || !phone_number) {
        return "El nombre y el número de teléfono son obligatorios";
    } else if (!phoneRegex.test(phone_number)) {
        return "El número de teléfono no es válido";
    } else if (!regex.test(email)) {
        return "El formato de correo electrónico no es válido";
    } else if (password.length < 3) {
        return "La contraseña debe tener al menos 3 caracteres";
    } else {
        return true;
    }
};

export default router;
