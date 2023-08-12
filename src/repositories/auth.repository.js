import { db } from "../database/database.connection.js"

export async function getUsers(email) {
    const users = db.query(`SELECT count(*) FROM users WHERE email = $1`, [email]);
    return users;
};

export async function insertSignUp(user) {
    const { name, email, hash } = user;

    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,[name, email, hash]);
};

export async function insertSignIn(user) {
    const { id, token } = user;
    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
};