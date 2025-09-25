import express from "express";
import multer from "multer";
import path from "path";
import { AuthTheUser } from "../Middleware/middleware.js";
import * as fun from "../Controller/Controller.js";
const Routes = express.Router();

// Storage Engine for Client Transcition Script
const storeTranscripte = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("TransImages"))
    },
    filename: (req, file, cb) => {
        let extName = path.extname(file.originalname);
        cb(null, `${Date.now()}${extName}`)
    }
});
let uploadTrans = multer({ storage: storeTranscripte });

Routes.post("/user/auth", fun.UserAuthFun);
Routes.get("/data/sneakers", fun.getSneakers);
Routes.get("/data/sandels", fun.getSandels);
Routes.get("/data/normals", fun.getNormalShoe);
Routes.post("/user/cart/add", AuthTheUser, fun.AddtoCart)
Routes.post("/user/cart/sub", AuthTheUser, fun.SubFrmCart)
Routes.get("/user/cart", AuthTheUser, fun.getUserCartData)
Routes.get("/user/cart/display", AuthTheUser, fun.DisplayCartData);
Routes.post("/user/order/Add/paySimp", AuthTheUser, fun.storeOrderAddSp);
Routes.post("/user/order/Add/payTrans", uploadTrans.single("image"), fun.storeOrderAddPt);
Routes.get("/user/orders", AuthTheUser, fun.getUserOrders)
Routes.post("/user/order/items", AuthTheUser, fun.setorderitemsDetails);
Routes.get("/user/del/order", AuthTheUser, fun.delUserOrder)

// Admin Panel Routes;
// Storage Engine for Shoes Item ("Admin")
const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("Images"))
    },
    filename: (req, file, cb) => {
        let extName = path.extname(file.originalname);
        cb(null, `${Date.now()}${extName}`);
    }
});
let uploads = multer({ storage: storeImage });
Routes.get("/Ad/Orders", fun.getAllOrders);
Routes.get("/Ad/Items", fun.getAllItems);
Routes.post("/Ad/del/item", fun.delItemByAdmin);
Routes.post("/Ad/Cnsl/Order", fun.AdmnCansldOrdr);
Routes.post("/Ad/del/cnsld/ordr", fun.Admindelcnsldordr);
Routes.post("/Ad/ordr/acptd", fun.AdmnAcsptdOrdr);

Routes.post("/add/items", uploads.single("image"), fun.addItem);

export default Routes;