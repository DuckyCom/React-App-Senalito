import { query } from "express";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import {UserRepository} from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { secretKey } from "../auth/jwt.js";
const client = new pg.Client(config);
client.connect();
const userRepository = new UserRepository(); 

export class UserService {
    async verificarUsuario(email, password) {
        const usuario = await userRepository.buscarUsuarioPorEmail(email); 
       
    
        if (usuario && await userRepository.verificarPassword(usuario.password, password)) {
            // Genera un token JWT
            const token = jwt.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '1h' });
            return { usuario, token };
        } else {
            return null;
        }
    }
    
    async crearUsuario(first_name, phone_number, email, password){
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const resultadoC = userRepository.crearUsuarioRep(first_name, phone_number, email, hashedPassword);
        return resultadoC;
    }
}
