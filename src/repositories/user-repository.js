import pg from "pg";
import { config } from "./db.js";
import { createToken } from "../auth/jwt.js";

const client = new pg.Client(config);
client.connect();

export class UserRepository {
    async verificacionUsuario(first_name, password) {
        try {
            const query = "SELECT id, first_name, password FROM users WHERE first_name = $1 AND password = $2";
            const values = [first_name, password];
            const respuesta = await client.query(query, values);
            if (respuesta.rows.length > 0) {
                const token = createToken(respuesta.rows[0]); // Asegúrate de que createToken esté funcionando correctamente
                return token;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error en verificacionUsuario:", error);
            throw error;
        }
    }


    async crearUsuarioRep(first_name, last_name, username, password) {
        try {
            const query = "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id";
            const values = [first_name, last_name, username, password];
            const respuesta = await client.query(query, values);
            return respuesta.rows[0].id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
