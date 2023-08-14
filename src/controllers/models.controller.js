import { listModels, getDetails, authUser, insertDetails, insertModel } from "../repositories/models.repository.js";

export async function getModels(req, res) {
    try {
        const models = await listModels();

        res.status(200).send(models.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getModelDetails(req, res) {
    const { id } = req.params;

    try {
        const modelDetails = await getDetails(id);

        res.status(200).send(modelDetails.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postModel(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const userQuery = await authUser(token);
        const userId = userQuery.rowCount !== 0 ? userQuery.rows[0].userId : undefined;
        if(userId === undefined) return res.status(401).send("Token inválido!"); 

        const detailsId = await insertDetails(req.body);
        await insertModel(userId, detailsId);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}