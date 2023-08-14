import { db } from "../database/database.connection.js";

export async function listModels() {
    const models = await db.query(`SELECT 
                                    m.id,
                                    md.name, 
                                    md.picture, 
                                    md.species, 
                                    md.race, 
                                    md.age, 
                                    md.description, 
                                    md."pricePerHour" 
                                FROM models m 
                                    JOIN "modelDetails" md ON m."detailsId" = md.id
                                WHERE m."isActive" = true
                                ORDER BY m."createdAt" DESC
                                LIMIT 10;`);

    return models;
};

export async function getDetails(id) {
    const modelDetails = await db.query(`SELECT 
                                        md.name, 
                                        md.picture, 
                                        md.species, 
                                        md.race, 
                                        md.age, 
                                        md.description, 
                                        md."pricePerHour" 
                                    FROM models m 
                                        JOIN "modelDetails" md ON m."detailsId" = md.id
                                    WHERE m.id=$1;`,[id]);

    return modelDetails;
}   

export async function authUser(token) {
    const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
    return user;
}

export async function insertDetails(body) {
    const { name, picture, species, race, age, description, pricePerHour } = body;

    const detailsId = await db.query(`INSERT INTO "modelDetails" (name, picture, species, race, age, description, "pricePerHour") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, [name, picture, species, race, age, description, pricePerHour]);
    return detailsId.rows[0].id;
}

export async function insertModel(userId, detailsId) {
    await db.query(`INSERT INTO models ("createdBy", "detailsId", "isActive") VALUES ($1, $2, $3)`, [userId, detailsId, true]);
}