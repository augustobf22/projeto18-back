import { db } from "../database/database.connection.js";
import { listModels, getDetails, authUser, insertUser } from "../repositories/models.repository.js";

export async function getModels(req, res) {
    try {
        const models = listModels();

        res.status(200).send(models.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getModelDetails(req, res) {
    const { id } = req.params;

    try {
        const modelDetails = getDetails(id);

        res.status(200).send(modelDetails.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postModel(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const userQuery = authUser(token);
        const userId = userQuery.rowCount !== 0 ? userQuery.rows[0].userId : undefined;
        if(userId === undefined) return res.status(401).send("Token inválido!"); 

        insertUser(body);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}