import { useState } from "react"
import "./placeOrder.css"
import { cancalTheOrder, storeOrderAdd } from "../../APICalls/Apicalls";
import { toast, ToastContainer } from "react-toastify";
export const PlaceorderPage = () => {
    let orderId = JSON.parse(localStorage.getItem("EncOi"));
    let [paymentPage, setPaymentpage] = useState("Cash on Delivery");
    let [image, setImage] = useState("");
    let [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        size: "",
        postal: "",
        payment: ""
    });
    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setData(prevData => ({ ...prevData, [name]: value }));
    }
    const formSubmission = (e) => {
        e.preventDefault();
        if (data.payment === "" || data.size === "" || data.payment === "payment method") {
            toast.error("Fill the fields first")
        } else {
            (paymentPage === "Bank Transfer") ? data["image"] = image : data;
            let formData = new FormData;
            formData = data;
            if (orderId) {
                (image) ? image = image : image = undefined;
                storeOrderAdd(formData, image, orderId)
            } else {
                window.location.href = "/";
            }
            setImage("");
            setData({
                name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                size: "",
                postal: "",
                instructions: "",
                payment: ""
            });
            setPaymentpage("Cash on Delivery")
        }
    }
    return (
        <>
            <ToastContainer />
            <header>
            </header>
            <main className="container">
                <section className="card">
                    <div className="brand">
                        <div className="logo">OD</div>
                        <div>
                            <h1>Order Delivery Form</h1>
                            <p className="lead">Fast — Reliable — Trackable. Fill the details below to place your delivery order.</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => formSubmission(e)}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Full name</label>
                                <input id="name" name="name" type="text" placeholder="Jane Doe" value={data.name} onChange={(e) => changeHandler(e)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" name="phone" type="tel" placeholder="+92 300 0000000" value={data.phone} onChange={(e) => changeHandler(e)} required />
                            </div>
                        </div>

                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="jane@example.com" value={data.email} onChange={(e) => changeHandler(e)} />
                        </div>

                        <label htmlFor="address">Delivery address</label>
                        <textarea id="address" name="address" placeholder="Street, Building, Floor, Landmark" value={data.address} onChange={(e) => changeHandler(e)}></textarea>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="city">City</label>
                                <input id="city" name="city" type="text" placeholder="Karachi" value={data.city} onChange={(e) => changeHandler(e)} />
                            </div>
                            <div className="col">
                                <label htmlFor="postal">Postal / ZIP</label>
                                <input id="postal" name="postal" type="text" placeholder="74200" value={data.postal} onChange={(e) => changeHandler(e)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="payment">Payment method</label>
                                <select id="payment" name="payment" value={data.payment} onChange={(e) => { setPaymentpage(e.target.value); changeHandler(e) }}>
                                    <option>payment method</option>
                                    <option>Cash on Delivery</option>
                                    <option>Self Pick</option>
                                    <option>Bank Transfer</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="fragile">Size</label>
                                <select id="fragile" name="size" value={data.size} onChange={(e) => { changeHandler(e) }}>
                                    <option>size</option>
                                    <option>35</option>
                                    <option>36</option>
                                    <option>37</option>
                                    <option>38</option>
                                    <option>39</option>
                                    <option>40</option>
                                    <option>41</option>
                                </select>
                            </div>
                        </div>

                        {(paymentPage === "Bank Transfer")
                            ?
                            <>
                                <label htmlFor="image">
                                    {(image !== "")
                                        ?
                                        <>
                                            <img src={URL.createObjectURL(image)} className="scriptImg"></img>
                                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                        </>
                                        :
                                        <>
                                            <span className="defaultImage">
                                                <p className="uploadSign">📤</p>
                                                <p className="uploadPara">Upload Receipt</p>
                                            </span>
                                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                        </>
                                    }
                                </label>
                            </>
                            :
                            <></>
                        }

                        <div className="flex-row">
                            <input id="terms" type="checkbox" required />
                            <label htmlFor="terms" className="small">I agree to the delivery terms and conditions.</label>
                        </div>

                        <div className="ODfooter">
                            <div className="small">Need help? Call +92 300 0000000</div>
                            <div className="button-group">
                                <div type="reset" className="secondary" onClick={() => cancalTheOrder(orderId)} >Go Back</div>
                                <button type="submit" className="btn">Place Order</button>
                            </div>
                        </div>
                        {(paymentPage === "Bank Transfer") ?
                            <div>
                                <div className="medium">EasyPaisa Account : +92 300 0000000</div>
                                <div className="medium">Bank Account : 9090-3000-0000-0000</div>
                            </div>
                            :
                            <></>
                        }
                    </form>
                </section>

                <aside className="summary card">
                    <h3>Delivery Description</h3>
                    <div className="line"><span className="small">Estimated delivery</span><span className="small">2–3 days</span></div>
                    <div className="line"><span className="small">Delivery fee</span><span className="small">PKR 350</span></div>
                    <div className="line"><span className="small">Tax</span><span className="small">PKR 0</span></div>
                    <div className="total"><span>Total</span><span>PKR 350</span></div>
                    <div className="divider"></div>
                    <div>
                        <strong>Pickup</strong>
                        <div className="small">From: ShoesShop , F-8 , Islamabad , Pakistan</div>
                    </div>

                    <div>
                        <strong>Deliver to</strong>
                        <div className="small">Form Address (Review form data)</div>
                    </div>
                </aside>
            </main>
        </>
    )
}