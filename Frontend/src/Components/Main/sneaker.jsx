import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { AddtoCart, getSneakers, getUserCartData, SubFrmCart } from "../../APICalls/Apicalls";
import { baseUrl } from "../../App";
export const SneakerSec = () => {
    let [data, setData] = useState([]);
    let [cartData, setCart] = useState([]);
    useEffect(() => {
        getSneakers(setData)
    }, []);
    useEffect(() => {
        getUserCartData(setCart)
    }, [data]);
    return (
        <section className="sec-banner sneaker-banner">
            <div className="hAndCardCont">
                <hr className="horz_line"></hr>
                <h2>Men Shoes</h2>
                <div className="sec-card-cont">
                    {(data[0])
                        ?
                        data.map((v, i) => {
                            return (
                                <div className="secCard" key={i}>
                                    {(cartData)
                                        ?
                                        <span className={(cartData[v.id]) ? "showCount" : "count"}>{cartData[v.id]}</span>
                                        :
                                        <></>
                                    }
                                    <img src={`${baseUrl}/Images/${v.image}`} />
                                    <div className="sec-cardDesc">
                                        <b className="productName">{v.name}</b>
                                        <p>{v.desc}</p>
                                        <p>{v.price} PKR</p>
                                        {/* Changing Button inerText with respect to situation(Item Exsist , Not Exsist , onHover , No satate etc) */}
                                        {(cartData)
                                            ?
                                            (cartData[v.id])
                                                ?
                                                <button>
                                                    <p className="cartIcon itemEsist">
                                                        <span className="subSpan" onClick={() => { SubFrmCart(v.id, setCart) }}> - </span>
                                                        <span className="addSpan" onClick={() => { AddtoCart(v.id, setCart) }}> + </span>
                                                    </p>
                                                </button>
                                                :
                                                <>
                                                    <button>
                                                        <p className="text">Add to card</p>
                                                        <p className="cartIcon">
                                                            <span className="subSpan" onClick={() => { SubFrmCart(v.id, setCart) }}> - </span>
                                                            <ShoppingCart />
                                                            <span className="addSpan" onClick={() => { AddtoCart(v.id, setCart) }}> + </span>
                                                        </p>
                                                    </button>
                                                </>
                                            :
                                            <button>
                                                <p className="text">Add to card</p>
                                            </button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="loaderCont">
                            <div className="loader"></div>
                        </div>
                    }
                </div>
                <hr className="horz_line"></hr>
            </div>
        </section>
    )
}