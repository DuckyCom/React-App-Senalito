import pg from "pg";
import { config } from "./db.js";
import { createToken } from "../auth/jwt.js";

const client = new pg.Client(config);
client.connect();

export class UserRepository {
    async verificacionUsuario(first_name, password) {
        try {
            const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
            const values = [first_name, password];
            const respuesta = await client.query(query, values);
            console.log(respuesta.rows[0])
            if (respuesta.rows.length > 0) {
                const user = respuesta.rows[0];
                const token = createToken(respuesta.rows[0]); 
                return {user, token};
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error en verificacionUsuario:", error);
            throw error;
        }
    }


    async crearUsuarioRep(first_name, username, email, password) {
        try {
            const query = "INSERT INTO users (first_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id";
            const values = [first_name, username, email, password];
            const respuesta = await client.query(query, values);
            // console.log(respuesta.rows[0], "ESTO ESTA PASANDO EN USER-REPOSITORY.js")
            return respuesta.rows[0].id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
