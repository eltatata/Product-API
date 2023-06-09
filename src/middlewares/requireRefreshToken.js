import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) throw new Error("No existe el token");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.REFRESH);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}