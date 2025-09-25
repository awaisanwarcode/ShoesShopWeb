import { VerifyAcc_Token } from "../Functions/function.js";

export const AuthTheUser = (req, res, next) => {
    if (req.headers.token || req.body) {
        let token = req.headers.token || req.body.token;
        let data = VerifyAcc_Token(token);
        if (!data) {
            res.json({ success: false, message: "UnAuthorized attempt , logIn first." })
        } else {
            req.user = data;
            next();
        }
    } else {
        res.json({ success: false, message: "UnAuthorized attempt , logIn first." });
    }
}