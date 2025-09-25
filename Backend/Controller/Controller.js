import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { GenerateId, loggingIn, registration, VerifyAcc_Token } from "../Functions/function.js";
import { emailSchema, phoneSchema } from "../Scehmeas/scehmeas.js";
const client = new MongoClient(process.env.DB_ADD);
const db = client.db(process.env.DB);
const coll = db.collection(process.env.COLL);
const coll2 = db.collection(process.env.COLL_2);
const coll3 = db.collection(process.env.COLL_3);

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

export const UserAuthFun = (req, res) => {
    if (req.body.name) {
        registration(req, res, coll);
    } else {
        loggingIn(req, res, coll)
    }
}

export const getSneakers = async (req, res) => {
    try {
        let sneakers = await coll2.find({ catagory: "Sneakers" }).toArray();
        res.json({ success: true, data: sneakers });
    } catch (error) {
        res.json({ success: false, message: "Can't load data." })
    }
}

export const getSandels = async (req, res) => {
    try {
        let sandels = await coll2.find({ catagory: "Sandels" }).toArray();
        res.json({ success: true, data: sandels });
    } catch (error) {
        res.json({ success: false, message: "Can't load data." })
    }
}

export const getNormalShoe = async (req, res) => {
    try {
        let normals = await coll2.find({ catagory: "Normal" }).toArray();
        res.json({ success: true, data: normals });
    } catch (error) {
        res.json({ success: false, message: "Can't load data." })
    }
}

export const AddtoCart = async (req, res) => {
    let UserId = req.user.id;
    let name = req.user.name;
    let [user] = await coll.find({ id: UserId, name }).toArray();
    if (!user) {
        res.json({ success: false, message: "Please  register first" });
    } else {
        let userCart = user.cartData;
        if (!userCart[req.body.itemId]) {
            userCart[req.body.itemId] = 1;
            await coll.updateOne({ id: UserId, name }, { $set: { cartData: userCart } });
            res.json({ success: true, cd: userCart });
        } else {
            userCart[req.body.itemId] += 1
            await coll.updateOne({ id: UserId, name }, { $set: { cartData: userCart } });
            res.json({ success: true, cd: userCart });
        }
    }
}

export const SubFrmCart = async (req, res) => {
    let UserId = req.user.id;
    let name = req.user.name;
    let [user] = await coll.find({ id: UserId, name }).toArray();
    if (!user) {
        res.json({ success: false, message: "Please  register first" });
    } else {
        let userCart = user.cartData;
        if (!userCart[req.body.itemId]) {
            res.json({ success: false, message: "Item deosn't exsist in cart.", cd: userCart });
        } else {
            userCart[req.body.itemId] -= 1
            await coll.updateOne({ id: UserId, name }, { $set: { cartData: userCart } });
            res.json({ success: true, cd: userCart });
        }
    }
}

export const getUserCartData = async (req, res) => {
    let UserId = req.user.id;
    let name = req.user.name;
    let [userData] = await coll.find({ id: UserId, name }).toArray();
    let userCart = userData.cartData;
    res.json({ success: true, cd: userCart })
}

export const DisplayCartData = async (req, res) => {
    let UserId = req.user.id;
    let name = req.user.name;
    let [userData] = await coll.find({ id: UserId, name }).toArray();
    let cartData = userData.cartData;
    let allItem = await coll2.find({}).toArray();
    let cartItems = [];
    allItem.map((v, i) => {
        if (cartData[String(i + 1)]) {
            cartItems.push(v);
        }
    });
    res.json({ success: true, cd: cartItems, cq: cartData });
}

export const storeOrderAddSp = async (req, res) => {
    let user = req.user;
    let userAdd = req.body.data
    await coll3.updateOne({ id: user.id, userAdd: undefined }, { $set: { userAdd } });
    await coll.updateOne({ id: user.id, name: user.name }, { $set: { cartData: {} } })
    res.json({ success: true });
}

export const storeOrderAddPt = async (req, res) => {
    let token = req.body.token;
    let phone = phoneSchema.safeParse(req.body.phone).data;
    let email = emailSchema.safeParse(req.body.email).data;
    if (phone && email) {
        let userAdd = {
            phone,
            email,
            address: req.body.address,
            city: req.body.city,
            size: req.body.size,
            postal: req.body.postal,
            payment: req.body.payment
        }
        let fileName = req.file.filename;
        let userData = VerifyAcc_Token(token);
        if (userData && fileName) {
            await coll3.updateOne({ id: userData.id, userAdd: undefined }, { $set: { userAdd, TransImage: fileName } });
            await coll.updateOne({ id: userData.id, name: userData.name }, { $set: { cartData: {} } })
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "UnAuthorized Attempt LogIn first" });
        }
    } else {
        res.json({ success: false, message: "Invaild Email" });
    }
}

export const getUserOrders = async (req, res) => {
    await coll3.deleteMany({ id: req.user.id, userAdd: undefined });
    try {
        let Orders = await coll3.find({ id: req.user.id }).toArray();
        res.json({ success: true, OU: Orders });
    } catch (error) {
        res.json({ success: false });
    }
}

export const setorderitemsDetails = async (req, res) => {
    try {
        let orderId = await GenerateId(coll3)
        await coll3.insertOne({ Items: req.body.orderItems, id: req.user.id, orderId, Date: Date.now(), status: "", reason: "" });
        await coll.updateOne({ id: req.user.id, name: req.user.name }, { $set: { cartData: {} } })
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
}

export const delUserOrder = async (req, res) => {
    let id = req.user.id;
    try {
        await coll3.deleteMany({ id: req.user.id, userAdd: undefined });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
}

//Admin Panel Controller Logic;

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
        correctingSeries();
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
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false })
    }
}

const correctingSeries = async () => {
    let items = await coll2.find({}).toArray();
    for (let i = 0; i < items.length; i++) {
        await coll2.updateOne({ image: items[i].image }, { $set: { id: i + 1 } })
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
