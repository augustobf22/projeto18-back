import { db } from "../database/database.connection.js"
import { authUser } from "../repositories/models.repository.js";
import { getUserModels, getCurrent, queryUpdate, queryDelete } from "../repositories/users.repository.js";

export async function listUserModels(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const userQuery = await authUser(token);
        const userId = userQuery.rowCount !== 0 ? userQuery.rows[0].userId : undefined;
        if(userId === undefined) return res.status(401).send("Token inválido!"); 
        
        const userModels = await getUserModels(userId);
        res.status(200).send(userModels.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateModel(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const {modelId} = req.params;

    try {
        const userQuery = await authUser(token);
        const userId = userQuery.rowCount !== 0 ? userQuery.rows[0].userId : undefined;
        if(userId === undefined) return res.status(401).send("Token inválido!"); 

        const current = await getCurrent(modelId);
        await queryUpdate(modelId, current);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteModel(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const {modelId} = req.params;

    try {
        const userQuery = await authUser(token);
        const userId = userQuery.rowCount !== 0 ? userQuery.rows[0].userId : undefined;
        if(userId === undefined) return res.status(401).send("Token inválido!"); 

        await queryDelete(modelId);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getHistory(req, res) {
    try {
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}