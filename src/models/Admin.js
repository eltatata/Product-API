import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { Schema, model } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { updatedAt: false }
});

adminSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

adminSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
}

export const Admin = model("Admin", adminSchema);