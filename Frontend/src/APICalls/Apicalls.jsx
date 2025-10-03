import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";
export const token = JSON.parse(localStorage.getItem("token"));

export const sendAuthData = (data, setMessage) => {
    axios.post(`${baseUrl}/user/auth`, data)
        .then((res) => {
            setMessage(res.data.message);
            if (res.data.success) {
                localStorage.setItem("token", JSON.stringify(res.data.token));
            }
        }).catch((err) => {
            setMessage("Error Occured , try Again.")
        })
}

export const getAllItems = (setItemslist) => {
    axios.get(`${baseUrl}/get/All/Items`)
        .then((res) => {
            setItemslist(res.data.Itms)
        }).catch((err) => {
            setItemslist(undefined)
        })
}

export const getUserCartData = (setCart) => {
    axios.get(`${baseUrl}/user/cart`, {
        headers: {
            "token": token
        }
    }).then((res) => {
        if (res.data.success) {
            setCart(res.data.cd)
        } else {
            setCart({})
        }
    }).catch((err) => {
        setCart({})
    })
}

export const storeOrderAdd = (data, image, orderId) => {
    if (image && data.payment === "Bank Transfer") {
        data["image"] = image;
        data["token"] = token
        data["orderId"] = orderId
        axios.post(`${baseUrl}/user/order/Add/payTrans`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            if (res.data.success) {
                localStorage.removeItem("EncOi");
                window.location.href = ("/user/orders")
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    } else if (image && data.payment !== "Bank Transfer" || !image && data.payment === "Bank Transfer") {
        toast.warning("Invalid Payment method used.")
    } else {
        axios.post(`${baseUrl}/user/order/Add/paySimp`, { data, token, orderId })
            .then((res) => {
                if (res.data.success) {
                    localStorage.removeItem("EncOi");
                    window.location.href = ("/user/orders")
                } else {
                    toast.error(res.data.message);
                }
            }).catch((err) => {
                toast.error("Something went wrong")
            })
    }
}

export const getUserOrders = (setOrders) => {
    axios.get(`${baseUrl}/user/orders`, {
        headers: {
            "token": token
        }
    }).then((res) => {
        if (res.data.success) {
            setOrders(res.data.OU)
        } else {
            setOrders([])
        }
    }).catch((err) => {
        toast.error("Error Occured");
    })
}

export const cancalTheOrder = (orderId) => {
    axios.post(`${baseUrl}/user/del/order`, { orderId })
        .then((res) => {
            if (res.data.success) {
                localStorage.removeItem("EncOi");
                window.location.href = ("/");
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            localStorage.removeItem("EncOi");
            window.location.href = ("/");
        })
}

export const navigateToCartPage = (cartData) => {
    axios.post(`${baseUrl}/nvigte/crt/pge`, { cartData, token })
        .then((res) => {
            if (res.data.success) {
                localStorage.setItem("EncOi", JSON.stringify(res.data.EncOi))
                window.location.href = "/cart";
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error("error occured , try again")
        })
}

export const UpdteCrtAndNavigtToPay = (updatedCartData, Total, orderId) => {
    axios.post(`${baseUrl}/updt/crt/mve/pay`, { cartData: updatedCartData, Total, token, orderId })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/order/address";
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error("error occured , try again")
        })
}