import { db } from "../database/database.connection.js";

export async function getUserModels(userId) {
    const userModels = await db.query(`SELECT 
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
                                WHERE m."createdBy" = $1
                                ORDER BY m."createdAt" DESC
                                LIMIT 10;`, [userId]);
    
    return userModels;
};

export async function getCurrent(modelId){
    const current = await db.query(`SELECT m."isActive" FROM models m WHERE m.id=$1`,[modelId]);
    return current.rows[0].isActive;
}

export async function queryUpdate(modelId, current) {
    await db.query(`UPDATE models SET "isActive"=$1 WHERE id=$2`,[!current, modelId]);
}

export async function queryDelete(modelId) {
    await db.query(`DELETE FROM models WHERE id=$1`,[modelId]);
}