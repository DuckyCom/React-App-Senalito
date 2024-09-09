import { query } from "express";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import {UserRepository} from "../repositories/user-repository.js";
const client = new pg.Client(config);
client.connect();
const userRepository = new UserRepository(); 

export class UserService {
    async verificacionUsuario(email, password){
        const resultadoV = await userRepository.verificacionUsuario(email, password);
        return resultadoV 
    }
    async crearUsuario(first_name, phone_number, email, password){
        const resultadoC = userRepository.crearUsuarioRep(first_name, phone_number, email, password);
        return resultadoC;
    }
}
