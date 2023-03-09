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

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generatorToken(req.uid);

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