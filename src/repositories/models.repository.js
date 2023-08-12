import { db } from "../database/database.connection.js";

export async function listModels() {
    const models = await db.query(`SELECT * FROM models;`);

    return models;
};

export async function getDetails(id) {
    const modelDetails = await db.query(`SELECT * FROM models WHERE id=$1;`,[id]);

    return modelDetails;
}

export async function authUser(token) {
    const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);

    return user;
}

export async function insertUser(body) {
    const { name, kind, photo, createdBy, isActive } = body;

    await db.query(`INSERT INTO models (name, kind, photo, "createdBy", "isActive") VALUES ($1, $2, $3, $4, $5)`, [name, kind, photo, createdBy, isActive]);
}