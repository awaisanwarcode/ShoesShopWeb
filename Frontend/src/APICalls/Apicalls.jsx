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

export const getSneakers = (setData) => {
    axios.get(`${baseUrl}/data/sneakers`)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setData([]);
            }
        })
        .catch((err) => setData([]))
}

export const getSandels = (setData) => {
    axios.get(`${baseUrl}/data/sandels`)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setData([]);
            }
        })
        .catch((err) => setData([]))
}

export const getNormals = (setData) => {
    axios.get(`${baseUrl}/data/normals`)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setData([]);
            }
        })
        .catch((err) => setData([]))
}

export const AddtoCart = (itemId, setCart) => {
    axios.post(`${baseUrl}/user/cart/add`, { itemId, token })
        .then((res) => {
            if (res.data.success) {
                setCart(res.data.cd);
            } else {
                toast.error(res.data.message)
                setCart([])
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
}

export const SubFrmCart = (itemId, setCart) => {
    axios.post(`${baseUrl}/user/cart/sub`, { itemId, token })
        .then((res) => {
            if (res.data.success) {
                setCart(res.data.cd);
            } else {
                toast.error(res.data.message)
                setCart(res.data.cd);
            }
        }).catch((err) => {
            toast.error("Something went wrong")
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
            setCart([])
        }
    }).catch((err) => {
        setCart(undefined)
    })
}

export const DisplayCartData = (setItem, setCartdata) => {
    axios.get(`${baseUrl}/user/cart/display`, {
        headers: {
            "token": token
        }
    })
        .then((res) => {
            setItem(res.data.cd);
            setCartdata(res.data.cq)
        }).catch((err) => {
            setItem(undefined);
            setCartdata(undefined)
        })
}

export const sendOrderItemsDetail = (orderItems) => {
    axios.post(`${baseUrl}/user/order/items`, { orderItems, token })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/order/address";
            } else {
                toast.error("Error Occured.")
            }
        }).catch((err) => {
            toast.error("Error Occured.")
        })
}

export const storeOrderAdd = (data, image) => {
    if (image && data.payment === "Bank Transfer") {
        data["image"] = image;
        data["token"] = token
        axios.post(`${baseUrl}/user/order/Add/payTrans`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            if (res.data.success) {
                window.location.href = ("/user/orders")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    } else if (image && data.payment !== "Bank Transfer" || !image && data.payment === "Bank Transfer") {
        toast.warning("Invalid Payment method used.")
    } else {
        axios.post(`${baseUrl}/user/order/Add/paySimp`, { data, token })
            .then((res) => {
                if (res.data.success) {
                    window.location.href = ("/user/orders")
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

export const cancalTheOrder = () => {
    axios.get(`${baseUrl}/user/del/order`, {
        headers: {
            "token": token
        }
    }).then((res) => {
        if (res.data.success) {
            window.location.href = ("/");
        }
    }).catch((err) => {
        toast.error("Can't Go back , try again")
    })
}