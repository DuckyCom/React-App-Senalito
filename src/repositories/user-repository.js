import pg from 'pg';
import { config } from './db.js';
import bcrypt from 'bcryptjs';

const client = new pg.Client(config);
client.connect();

export class UserRepository {
    async buscarUsuarioPorEmail(email) {
        try {
            const query = 'SELECT id, first_name, phone_number, email, password FROM users WHERE email = $1';
            const values = [email];
            const respuesta = await client.query(query, values);

            if (respuesta.rows.length > 0) {
                return respuesta.rows[0];
            } else {
                return null; // Usuario no encontrado
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async verificarPassword(storedPasswordHash, password) {
        return bcrypt.compare(password, storedPasswordHash);
    }

    async crearUsuarioRep(first_name, phone_number, email, password) {
        try {
            const query = 'INSERT INTO users (first_name, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
            const values = [first_name, phone_number, email, password];
            const respuesta = await client.query(query, values);
            return respuesta.rows[0].id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
