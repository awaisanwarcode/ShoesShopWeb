import { useEffect, useState } from "react"
import { Admindelcnsldordr, baseUrl, cancelTheOrder, getOrders, OrderAccepted } from "../../ApiCalls/ApiCalls"
import { HeaderComp } from "../../Components/Header/header"
import { SideNavbar } from "../../Components/SideNav/sidenav"
import "./orders.css"
import { ToastContainer } from "react-toastify"
export const OrdersPage = () => {
    let [orders, setOrders] = useState(undefined);
    let [showCnslCard, setcnslCard] = useState(false);
    let [cnslOrdrId, setcnslOrdrId] = useState(undefined);
    useEffect(() => {
        getOrders(setOrders)
    }, []);
    return (
        <>
            <HeaderComp />
            <ToastContainer />
            <div className={showCnslCard ? "cnsl-card" : "hidden"}>
                <div className="cross" onClick={() => setcnslCard(false)}>&times;</div>
                <h3>Tell the reason of cancellation to client  : </h3>
                <div className="pop-up-btn-grp">
                    <button onClick={() => { cancelTheOrder("Invalid Transcript", cnslOrdrId); setcnslCard(false) }}>Invalid Transcript</button>
                    <button onClick={() => { cancelTheOrder("Out of stock", cnslOrdrId); setcnslCard(false) }}>Out of stock</button>
                </div>
            </div>
            <section className="Ad-Sec">
                <SideNavbar />
                <div className="ordr-hed-cont">
                    {(orders)
                        ?
                        orders.map((v, i) => {
                            return (
                                <fieldset className="sgle-ordr" key={i}>
                                    <legend>📦 . {i + 1}</legend>
                                    <div className="ordr-elm">
                                        <div>
                                            <p>{v.userAdd["name"]}</p>
                                            <p>{v.userAdd["address"]}</p>
                                            <p>{v.userAdd["email"]}</p>
                                            <p>{v.userAdd["phone"]}</p>
                                        </div>
                                        {(v.status !== "")
                                            ?
                                            (v.status === "Accepted")
                                                ?
                                                <>
                                                    <button className="del-ordr-btn" onClick={() => Admindelcnsldordr(v.orderId, v.TransImage)}>delete Order</button>
                                                    <p>This Order is ACCEPTED.It's Recommended to delete the order after a day , so that client can notice.</p>
                                                </>

                                                :
                                                <div>
                                                    <button className="del-ordr-btn" onClick={() => { Admindelcnsldordr(v.orderId, v.TransImage); }}>delete Order</button>
                                                    <p>It's Recommended to delete the order after a day , so that client can notice.</p>
                                                    <p>Reason : {v.reason}</p>
                                                </div>
                                            :
                                            <div>
                                                <button className="cncl-btn" onClick={() => { setcnslCard(!showCnslCard); setcnslOrdrId(v.orderId); }}>Cancel</button>
                                                <button className="acpt-btn" onClick={() => { OrderAccepted(v.orderId) }}>Accept</button>
                                            </div>
                                        }
                                    </div>
                                    <div className="ordr-elm">
                                        {v.Items.map((j, i) => {
                                            if (j.name && j.quantity) {
                                                return (
                                                    <p key={i}>{j.name} x {j.quantity}</p>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="ordr-elm odr-qty">
                                        <p>{v.Items[v["Items"].length - 1]}</p>
                                    </div>
                                    <div className="ordr-elm">
                                        {(v.TransImage)
                                            ?
                                            <>
                                                <a href={`${baseUrl}/TImg/${v.TransImage}`}>
                                                    <img src={`${baseUrl}/TImg/${v.TransImage}`} alt="Payment Script" />
                                                </a>
                                                <p>{v["userAdd"]["payment"]}</p>
                                                <p>Click on Image to Review</p>
                                            </>
                                            :
                                            <>
                                                <p>{new Date(v.Date).toISOString().split('T')[0]}</p>
                                                <p>{v["userAdd"]["payment"]}</p>
                                            </>
                                        }
                                    </div>
                                </fieldset>
                            )
                        })
                        :
                        <h3>Orders doesn't exsist.</h3>
                    }
                </div>
            </section>
        </>
    )
}