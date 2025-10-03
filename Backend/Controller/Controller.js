import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
// Here we import all the functions using "* as fun";
import { correctingSeries, correctingSeriesOfOColl, deCryptingData, encryptingDta, GenerateId, loggingIn, registration, VerifyAcc_Token } from "../Functions/function.js";
import { emailSchema, phoneSchema, postalCodeSchema } from "../Scehmeas/scehmeas.js";
const client = new MongoClient(process.env.DB_ADD);
const db = client.db(process.env.DB);
const coll = db.collection(process.env.COLL);
const coll2 = db.collection(process.env.COLL_2);
const coll3 = db.collection(process.env.COLL_3);

export const UserAuthFun = (req, res) => {
    if (req.body.name) {
        registration(req, res, coll);
    } else {
        loggingIn(req, res, coll)
    }
}
// Function that help to save user cart data & navigate the user to cart page:
export const navigateToCartPage = async (req, res) => {
    let [userExsist] = await coll.find({ id: req.user.id, name: req.user.name }).toArray();
    if (userExsist) {
        try {
            let orderId = await GenerateId(coll3);
            await coll.updateOne({ id: req.user.id, name: req.user.name }, { $set: { cartData: req.body.cartData } });
            await coll3.insertOne({ id: req.user.id, name: req.user.name, orderId, cartData: req.body.cartData });
            let encOrderId = encryptingDta(orderId);
            res.json({ success: true, EncOi: encOrderId });
        } catch (error) {
            res.json({ success: false, message: "Something went wrong , try again" })
        }
    } else {
        res.json({ success: false, message: "Unathorized Attempt , login first" })
    }
}
// Function that help to store the updated cartData in Order Collection & navigate the user to payment form:
export const UpdteCrtAndNavigtToPay = async (req, res) => {
    let orderId = deCryptingData(req.body.orderId);
    if (orderId) {
        try {
            await coll3.updateOne({ id: req.user.id, name: req.user.name, userAdd: undefined, orderId: orderId }
                , { $set: { cartData: req.body.cartData, Total: req.body.Total } });
            res.json({ success: true })
        } catch (error) {
            res.json({ success: false, message: "Something went wrong , try again" })
        }
    } else {
        res.json({ success: false, message: "Invalid Attempt , Go back to home & try again" })

    }
}
// Function that help to store userAddress with order data if payment is via "Bank Transfer:";
export const storeOrderAddPt = async (req, res) => {
    let token = req.body.token;
    let phone = phoneSchema.safeParse(req.body.phone).data;
    let email = emailSchema.safeParse(req.body.email).data;
    let postal = postalCodeSchema.safeParse(req.body.postal).data;
    let orderId = deCryptingData(req.body.orderId);
    if (orderId) {
        if (phone && email && postal) {
            let userAdd = {
                phone,
                email,
                address: req.body.address,
                city: req.body.city,
                size: req.body.size,
                postal,
                payment: req.body.payment
            }
            let fileName = req.file.filename;
            let userData = VerifyAcc_Token(token);
            if (userData && fileName) {
                await coll3.updateOne({ id: userData.id, name: userData.name, userAdd: undefined, orderId }
                    , { $set: { userAdd, TransImage: fileName, status: "", reason: "", Date: Date.now() } });
                await coll.updateOne({ id: userData.id, name: userData.name }, { $set: { cartData: {} } })
                res.json({ success: true });
            } else {
                res.json({ success: false, message: "UnAuthorized Attempt LogIn first" });
            }
        } else {
            res.json({ success: false, message: "Invaild data filled." });
        }
    } else {
        res.json({ success: false, message: "Invalid Attempt , Go back to home & try again" })
    }
}
// Function that help to store userAddress with order data if payment is other than "Bank Transfer:";
export const storeOrderAddSp = async (req, res) => {
    let orderId = deCryptingData(req.body.orderId);
    if (orderId) {
        let user = req.user;
        let userAdd = req.body.data
        await coll3.updateOne({ id: user.id, name: req.user.name, userAdd: undefined, orderId }
            , { $set: { userAdd, status: "", reason: "", Date: Date.now() } });
        await coll.updateOne({ id: user.id, name: user.name }, { $set: { cartData: {} } })
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid Attempt , Go back to home & try again" })
    }
}
// Function that help get user cart data:
export const getUserCartData = async (req, res) => {
    try {
        let UserId = req.user.id;
        let name = req.user.name;
        let [userData] = await coll.find({ id: UserId, name }).toArray();
        let userCart = userData.cartData;
        res.json({ success: true, cd: userCart })
    } catch (error) {
        res.json({ success: false })
    }
}
// Function that help to get user orders
export const getUserOrders = async (req, res) => {
    await coll3.deleteMany({ id: req.user.id, userAdd: undefined });
    try {
        let Orders = await coll3.find({ id: req.user.id, name: req.user.name }).toArray();
        res.json({ success: true, OU: Orders });
    } catch (error) {
        res.json({ success: false });
    }
}
// Function that hellp delete the incomplete order after clicking "Go Back" btn in delivery address form. 
export const delUserOrder = async (req, res) => {
    let orderId = deCryptingData(req.body.orderId);
    if (orderId) {
        try {
            await coll3.deleteMany({ orderId, userAdd: undefined });
            res.json({ success: true });
        } catch (error) {
            res.json({ success: false });
        }
    } else {
        res.json({ success: false, message: "Invalid Attempt , Go back to home & try again" })
    }
}
//Admin Panel Controller Logic;

export const addItem = async (req, res) => {
    let imageUrl = req.file.filename;
    let pName = req.body.productName;
    let pCata = req.body.productCatagory;
    let pDesc = req.body.productDesc;
    let pPrice = req.body.productPrice;
    let pId = await GenerateId(coll2);
    try {
        await coll2.insertOne({ id: pId, name: pName, catagory: pCata, desc: pDesc, price: pPrice, image: imageUrl });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: "Network error." })
    }
}

export const getAllOrders = async (req, res) => {
    await coll3.deleteMany({ userAdd: undefined });
    try {
        let Allorders = await coll3.find({}).toArray();
        if (Allorders[0]) {
            res.json({ success: true, Os: Allorders })
        } else {
            res.json({ success: true, Os: undefined })
        }
    } catch (error) {
        res.json({ success: false })
    }
}

export const getAllItems = async (req, res) => {
    try {
        let AllItms = await coll2.find({}).toArray();
        res.json({ success: true, Itms: AllItms })
    } catch (error) {
        res.json({ success: false })
    }
}

export const delItemByAdmin = async (req, res) => {
    try {
        await coll2.deleteOne({ id: req.body.id });
        fs.unlinkSync(`${path.resolve("Images")}/${req.body.image}`);
        correctingSeries(coll2);
        res.json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        res.json({ success: false })
    }
}

export const AdmnCansldOrdr = async (req, res) => {
    try {
        await coll3.updateOne({ orderId: req.body.id }, { $set: { status: "canceled", reason: req.body.reason } });
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false })
    }
}

export const Admindelcnsldordr = async (req, res) => {
    try {
        await coll3.deleteOne({ orderId: req.body.id });
        if (req.body.image) {
            fs.unlinkSync(`${path.resolve("TransImages")}/${req.body.image}`);
        }
        correctingSeriesOfOColl(coll3);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false })
    }
}

export const AdmnAcsptdOrdr = async (req, res) => {
    try {
        await coll3.updateOne({ orderId: req.body.id }, { $set: { status: "Accepted" } });
        res.json({ success: true, message: "Order Accepted successfully , Reload the page." })
    } catch (error) {
        res.json({ success: false })
    }
}
