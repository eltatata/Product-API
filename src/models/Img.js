import mongoose from "mongoose";

const { Schema, model } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
}, {
    timestamps: { updatedAt: false }
});

export const Img = model("Img", imageSchema);