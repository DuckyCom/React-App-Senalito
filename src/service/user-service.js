import { query } from "express";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import {UserRepository} from "../repositories/user-repository.js";
const client = new pg.Client(config);
client.connect();


export class UserService {
    async verificacionUsuario(username, password){
        const userRepository = new UserRepository(); 
        const resultadoV = await userRepository.verificacionUsuario(username, password);
        return resultadoV 
    }
    async crearUsuario(first_name, username, email, password){
        const userRepository = new UserRepository();
        const resultadoC = userRepository.crearUsuarioRep(first_name, username, email, password);
        return resultadoC;
    }


}


