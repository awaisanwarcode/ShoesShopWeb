import { emailSchema, nameScehmea, passSchema } from "../Scehmeas/scehmeas.js";
import JWT from "jsonwebtoken";
import argon2 from "argon2";

export const GenerateId = async (coll) => {
    let storedData = await coll.find({}).toArray();
    if (storedData.length === 0) {
        let id = 1;
        return id;
    } else {
        let id = storedData.length + 1
        return id;
    }
}

export const registration = async (req, res, coll) => {
    let userName = nameScehmea.safeParse(req.body.name);
    let userEmail = emailSchema.safeParse(req.body.email);
    let userPass = passSchema.safeParse(req.body.password);
    if (userPass.error && !userPass.success) {
        res.json({ success: false, message: "Password must be 6 character long" });
    } else if (userEmail.error && !userEmail.success) {
        res.json({ success: false, message: "Invaild Email" });
    } else {
        let hashedPassword = await argon2.hash(userPass.data);
        let UserId = await GenerateId(coll)
        let name = userName.data;
        let email = userEmail.data
        let [userExsist] = await coll.find({ email }).toArray();
        if (userExsist) {
            res.json({ success: false, message: "User Already Exsist." })
        } else {
            let Access_Token = GenerateAcc_Token({ UserId, name });
            await coll.insertOne({ id: UserId, name, email, password: hashedPassword, cartData: {} });
            res.json({ success: true, message: "You got registered 🎉", token: Access_Token });
        }
    }
}

export const loggingIn = async (req, res, coll) => {
    let userEmail = emailSchema.safeParse(req.body.email);
    let userPass = passSchema.safeParse(req.body.password);
    if (userPass.error && !userPass.success) {
        res.json({ success: false, message: "Password must be 6 character long" });
    } else if (userEmail.error && !userEmail.success) {
        res.json({ success: false, message: "Invaild Email" });
    } else {
        let [user] = await coll.find({ email: userEmail.data }).toArray();
        if (!user) {
            res.json({ success: false, message: "User is not registered." });
        } else {
            let verified = await argon2.verify(user.password, userPass.data);
            (!verified)
                ?
                res.json({ success: false, message: "Invalid email or password." })
                :
                // Can't assign varaibles here thata,s why called fun in value of obj key;
                res.json({ success: true, message: "You got log In 🎉.", token: GenerateAcc_Token({ UserId: user.id, name: user.name }) });
        }
    }
}

export const GenerateAcc_Token = ({ UserId, name }) => {
    let Access_Token = JWT.sign({ id: UserId, name }, process.env.JWT_KEY, {
        expiresIn: "3h"
    });
    return Access_Token;
}

export const VerifyAcc_Token = (token) => {
    try {
        let data = JWT.verify(token, process.env.JWT_KEY);
        return data;
    } catch (error) {
        let data = undefined
        return data
    }
}