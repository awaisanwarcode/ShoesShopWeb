import { useEffect, useState } from "react";
import { Footer } from "../../Components/Footer/footer";
import { Navbar } from "../../Components/Header/navbar";
import "./myOrders.css";
import { getUserOrders } from "../../APICalls/Apicalls";
import { baseUrl } from "../../App";
import { ToastContainer } from "react-toastify";
export const MyordersPage = () => {
    let [orders, setOrders] = useState([]);
    let [track, setTrack] = useState("No");
    useEffect(() => {
        getUserOrders(setOrders)
    }, []);
    return (
        <>
            <header>
                <ToastContainer />
                <Navbar />
            </header>
            <main id="myOrdersMain">
                <div className={(track !== "No") ? "contactCard yes" : "contactCard"}>
                    <div className="cross" onClick={() => setTrack("No")}>&times;</div>
                    <h3>Track your Order :</h3>
                    <p>📞 Call us : <b>+92300 0000000</b></p>
                    <p>💬 WhatsApp: <b>+92300 0000000</b></p>
                    <p></p>
                </div>
                <div className="my-Odr-top-d">
                    <h1>My Orders</h1>
                    <button onClick={() => { setTrack("Yes") }}>Track Orders</button>
                </div>
                <section id="myOrdersSec">
                    <fieldset className="headerField">
                        <b>Address</b>
                        <b>Items</b>
                        <b>Total Price</b>
                        <b>Date/Transiction</b>
                    </fieldset>
                    {(orders)
                        ?
                        orders.map((v, i) => {
                            return (
                                <fieldset key={i}>
                                    <legend>📙.{i + 1} {(v.status == "Accepted") ? <b className="ordrAcc">Accepted</b> : <></>}</legend>
                                    <div key={i}>
                                        <b className="title">Address : </b>
                                        <p>{orders[i]["userAdd"].name}</p>
                                        <p>{orders[i]["userAdd"].address}</p>
                                        <p>{orders[i]["userAdd"].phone}</p>
                                        <p>{orders[i]["userAdd"].email}</p>
                                    </div>
                                    <div>
                                        <b className="title">Item x Quantity : </b>
                                        {
                                            (v.cartData) ?
                                                v.cartData.map((v, i) => {
                                                    if (v.name) {
                                                        return (
                                                            <p key={i}>{v.name} x {v.quantity}</p>
                                                        )
                                                    }
                                                })
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div>
                                        <b className="title">Price : </b>
                                        {v.Total}
                                    </div>
                                    {(v.status !== "" && v.status !== "Accepted")
                                        ?
                                        <div>
                                            You are Order is Cancelled & the <b>REASON is {v.reason}</b>.
                                            For Any Compline Call Us:
                                        </div>
                                        :
                                        (v.TransImage)
                                            ?
                                            <div>
                                                <b className="title">Transcripte Image :</b>
                                                <img src={`${baseUrl}/TImg/${v.TransImage}`} className="TranscImage"></img>
                                            </div>
                                            :
                                            <div>
                                                <b className="title">Date : </b>
                                                {new Date(orders[i].Date).toISOString().split('T')[0]}
                                            </div>
                                    }
                                </fieldset>
                            )
                        })
                        :
                        <></>
                    }
                </section>
            </main>
            <Footer />
        </>
    )
}