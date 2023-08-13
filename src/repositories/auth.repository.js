import { db } from "../database/database.connection.js"

export async function getUsers(email) {
    const users = db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return users;
};

export async function insertSignUp(user) {
    const { name, email, phone, picture, hash } = user;

    await db.query(`INSERT INTO users (name, email, phone, picture, password) VALUES ($1, $2, $3, $4, $5);`,[name, email, phone, picture, hash]);
};

export async function insertSignIn(user) {
    const { id, token } = user;
    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
};