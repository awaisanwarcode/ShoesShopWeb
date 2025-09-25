import { useEffect, useState } from "react"
import { Navbar } from "../../Components/Header/navbar"
import { AddtoCart, DisplayCartData, sendOrderItemsDetail, SubFrmCart } from "../../APICalls/Apicalls"
import "./cart.css"
import { baseUrl } from "../../App";
export const CartPage = () => {
    let [items, setItems] = useState(undefined);
    let [cartData, setCartdata] = useState(undefined);
    useEffect(() => {
        DisplayCartData(setItems, setCartdata);
    }, []);
    let subTotal = 0;
    let orderItems = [];
    const moveToplaceOrder = () => {
        items.map((v, i) => {
            if (cartData[String(v.id)]) {
                v["quantity"] = cartData[String(v.id)];
                orderItems.push(v);
            }
        });
        orderItems.push(subTotal);
        sendOrderItemsDetail(orderItems)
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main id="cartMain">
                <section id="cartSec">
                    <div className="RowsCont">
                        <div className="itemRow headerRow">
                            <b className="rowElem">Image/Name</b>
                            <b className="rowElem">Quantity</b>
                            <b className="rowElem">Price</b>
                            <b className="rowElem">price*Qunatity</b>
                            <b className="rowElem">Actions</b>
                        </div>
                        {(items)
                            ?
                            (items.map((v, i) => {
                                if (v.image) {
                                    return (
                                        <div key={i}>
                                            <div className="itemRow" key={i}>
                                                <span className="rowElem imgAndName">
                                                    <b className="title">Image/Name : </b>
                                                    <div>
                                                        <img src={`${baseUrl}/Images/${v.image}`} />
                                                        <b>{v.name}</b>
                                                    </div>
                                                </span>
                                                {(cartData[String(v.id)])
                                                    ?
                                                    <div className="rowElem">
                                                        <b className="title"> Quantity : </b>
                                                        <p>{cartData[String(v.id)]}</p>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                                <div className="rowElem">
                                                    <b className="title"> price/Item : </b>
                                                    <p>{v.price}</p>
                                                </div>
                                                <div className="rowElem">
                                                    <b className="title"> Total Price : </b>
                                                    <p>{cartData[String(v.id)] * v.price}</p>
                                                </div>
                                                <p hidden>{subTotal = subTotal + (cartData[String(v.id)] * v.price)}</p>
                                                <span className="rowElem Actions">
                                                    {(cartData[String(v.id)] === 0) ? window.location.reload() : <></>}
                                                    <b className="title">Actions : </b>
                                                    <div>
                                                        <button className="minus" onClick={() => { SubFrmCart(v.id, setCartdata) }}>-</button>
                                                        <button className="plus" onClick={() => { AddtoCart(v.id, setCartdata) }}>+</button>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                            }))
                            :
                            <div className="emptyCartDiv">
                                <b>Your Cart is Empty </b><a href="/">Start Shopping</a>
                            </div>
                        }
                        <div className="btnDiv">
                            <button onClick={() => { (subTotal === 0) ? window.location.href = ("/") : moveToplaceOrder() }}>Proceed To Cheeckout</button>
                        </div>
                    </div>
                    <div className="SubTotalHeadDiv">
                        <h2>Cart Sub Total:</h2>
                        <div className="subTotaldives upperSubDiv">
                            <p>Cart Amount</p>
                            <p>PKR {subTotal}</p>
                        </div>
                        <div className="subTotaldives">
                            <p>Delivery Charges </p>
                            <p>PKR 350</p>
                        </div>
                        <div className="subTotaldives">
                            <b>Total</b>
                            <p> {(items)
                                ?
                                <b>PKR {subTotal + 350}</b>
                                :
                                <></>
                            }</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}