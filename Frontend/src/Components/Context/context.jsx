import { createContext, useEffect, useState } from "react";
import { getAllItems, getUserCartData } from "../../APICalls/Apicalls";

export const StoreContext = createContext(null);
const ContextProvider = (props) => {
    let [cartData, setCartdata] = useState({});
    let [itemList, setItemslist] = useState(undefined);
    let [orderId, setOrderId] = useState(undefined);
    useEffect(() => {
        getAllItems(setItemslist);
        getUserCartData(setCartdata);
    }, []);
    const AddToCart = (id) => {
        if (!cartData[id]) {
            setCartdata(prev => ({ ...prev, [id]: 1 }))
        } else {
            setCartdata(prev => ({ ...prev, [id]: cartData[id] + 1 }))
        }
    }

    const SubFrmCart = (id) => {
        if (cartData[id]) {
            setCartdata(prev => ({ ...prev, [id]: cartData[id] - 1 }))
        }
    }

    let number = 0;
    for (const element in cartData) {
        if (element) {
            number += cartData[element]
        } else {
            number = 0
        }
    }

    const ContextValue = {
        cartData,
        AddToCart,
        SubFrmCart,
        itemList,
        number
    }

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default ContextProvider;