import { Admin } from "../models/Admin.js"
import { createToken, createRefreshToken } from "../utils/tokenManager.js";

export const registerAdmin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) throw new Error("Ya existe ese admin");

        admin = new Admin(req.body);
        await admin.save();

        console.log(admin)

        res.json({ adminCreated: true, info: `name of new admin: ${admin.name}` });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) throw new Error("No esta registrado");

        if (!admin.comparePassword(req.body.password)) throw new Error("Contraseña incorrecta");

        const { token, expiresIn } = createToken(admin._id);

        createRefreshToken(admin._id, res);

        res.json({ login: "pass", token, expiresIn });
    } catch (error) {
        res.json({ error: error.message });
    }
}

// ES
// Cuando se inicia sesión se crean dos tokens, 
// el token de acceso que expirará dentro de 15 minutos y 
// el refresh token que se almacenará en las cookies con valides de 30 dias.

// Esto permitirá que cuando se desee hacer una actualización o escribir en la base de datos,
// se llame a la ruta /refreshToken, en donde se accederá al token que está en las cookies y
// se creará un nuevo token de acceso para poder manipular datos en la DB. 
// De esta manera se busca proteger la información de vulnerabilidades.

// EN
// When logging in, two tokens are created: an access token that expires in 15 minutes and
// a refresh token that is stored in cookies and remains valid for 30 days.

// This allows for calling the /refreshToken route when making updates or writing to the database,
// where the token stored in cookies is accessed and a new access token is created to manipulate data in the DB.
// This way, the information is protected from vulnerabilities.

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = createToken(req.uid);

        res.json({ token, expiresIn });
    } catch (error) {
        res.json(error.message);
    }
}

export const logoutAdmin = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: "Closed Session" });
    console.log("Closed Session");
}