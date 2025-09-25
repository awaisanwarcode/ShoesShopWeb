export const baseUrl = "http://localhost:8888";
import axios from "axios";
import { toast } from "react-toastify";

export const AddItem = (data) => {
    axios.post(`${baseUrl}/add/items`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => {
            toast.success("Item added successfully.")
        }).catch((err) => {
            toast.error("Something went wrong.")
        })
}

export const getOrders = (setOrders) => {
    axios.get(`${baseUrl}/Ad/Orders`)
        .then((res) => {
            setOrders(res.data.Os)
        }).catch((err) => {
            setOrders(undefined)
        })
}

export const getAllItems = (setAllItems) => {
    axios.get(`${baseUrl}/Ad/Items`)
        .then((res) => {
            setAllItems(res.data.Itms)
        }).catch((err) => {
            setAllItems(undefined)
        })
}

export const delItmByAdm = (image, id) => {
    axios.post(`${baseUrl}/Ad/del/item`, { image, id })
        .then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                toast.error("Can't delete it , try again.")
            }
        }).catch((err) => {
            toast.error("error occured")
        })
}

export const cancelTheOrder = (reason, id) => {
    axios.post(`${baseUrl}/Ad/Cnsl/Order`, { reason, id })
        .then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                toast.error("Error Occureed , Try Again")
            }
        }).catch((err) => {
            toast.error("Error Occured.")
        })
}

export const Admindelcnsldordr = (id, image) => {
    axios.post(`${baseUrl}/Ad/del/cnsld/ordr`, { id, image })
        .then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                toast.error("Can't delete it , try again.")
            }
        }).catch((err) => {
            toast.error("error occured")
        })
}

export const OrderAccepted = (id) => {
    axios.post(`${baseUrl}/Ad/ordr/acptd`, { id })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error("Can't delete it , try again.")
            }
        }).catch((err) => {
            toast.error("error occured")
        })
}