import jwt from "jsonwebtoken";

export function signJwtToken(payload: object) {
    if (!process.env.NEXTAUTH_SECRET) {
        throw new Error("NEXTAUTH_SECRET is not defined");
    }

    return jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
        expiresIn: "7d",
    });
}
