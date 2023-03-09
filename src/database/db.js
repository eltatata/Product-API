import mongoose from "mongoose";

try {
    const db = await mongoose.connect(process.env.URI);
    console.log(`conectado a MongoDB: ${db.connection.name}`.yellow);
} catch (error) {
    console.log(`Error de conexion a DB: ${error}`);
}