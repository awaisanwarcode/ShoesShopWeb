import { useContext } from "react"
import { Navbar } from "../../Components/Header/navbar"
import "./cart.css"
import { baseUrl } from "../../App";
import { StoreContext } from "../../Components/Context/context";
import { UpdteCrtAndNavigtToPay } from "../../APICalls/Apicalls";
export const CartPage = () => {
    let orderId = JSON.parse(localStorage.getItem("EncOi"));
    let { itemList, cartData, AddToCart, SubFrmCart } = useContext(StoreContext);
    let items = [];
    if (itemList) {
        itemList.filter((v, i) => {
            if (cartData[i + 1]) {
                v["quantity"] = cartData[i + 1];
                items.push(v)
            }
        })
    }
    let subTotal = 0;
    const moveToplaceOrder = () => {
        if (orderId) {
            UpdteCrtAndNavigtToPay(items, subTotal, orderId);
        } else {
            window.location.href = "/"
        }
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
                                                <div className="rowElem">
                                                    <b className="title"> Quantity : </b>
                                                    <p>{v.quantity}</p>
                                                </div>
                                                <div className="rowElem">
                                                    <b className="title"> price/Item : </b>
                                                    <p>{v.price}</p>
                                                </div>
                                                <div className="rowElem">
                                                    <b className="title"> Total Price : </b>
                                                    <p>{v.quantity * v.price}</p>
                                                </div>
                                                <p hidden>{subTotal = subTotal + (v.quantity * v.price)}</p>
                                                <span className="rowElem Actions">
                                                    {(v.quantity === 0) ? window.location.reload() : <></>}
                                                    <b className="title">Actions : </b>
                                                    <div>
                                                        <button className="minus" onClick={() => { SubFrmCart(v.id) }}>-</button>
                                                        <button className="plus" onClick={() => { AddToCart(v.id) }}>+</button>
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