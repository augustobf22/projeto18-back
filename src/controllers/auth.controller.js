import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { getUsers, insertSignUp, insertSignIn } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) return res.status(422).send("As senhas digitadas não são iguais!");

    try {
        const user = await getUsers(email);

        if (user.rows[0].count > 0) return res.status(409).send("E-mail já cadastrado");

        const hash = bcrypt.hashSync(password, 10);

        const userToInsert = {name, email, hash};
        insertSignUp(userToInsert);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const userFound = await getUsers(email);
        if (userFound.rowCount === 0) return res.status(401).send("Usuário não encontrado!");
        
        const user = userFound.rows[0];

        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            const userToInsert = { id: user.id, token };
            insertSignIn(userToInsert);

            return res.status(200).send({ "token": token });
        } else {
            return res.status(401).send("Senha incorreta!");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};