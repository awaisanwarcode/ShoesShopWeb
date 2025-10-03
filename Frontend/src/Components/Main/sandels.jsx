import { useContext } from "react"
import { ShoppingCart } from "lucide-react"
import { baseUrl } from "../../App";
import { StoreContext } from "../Context/context";
export const SandelSec = () => {
    let { itemList, cartData, AddToCart, SubFrmCart } = useContext(StoreContext);
    let data = [];
    if (itemList) {
        itemList.filter((v, i) => {
            if (v.catagory === "Sandels") {
                data.push(v);
            }
        })
    }
    return (
        <section>
            <div className="hAndCardCont">
                <h2>Women Shoes</h2>
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
                                                        <span className="subSpan" onClick={() => { SubFrmCart(v.id) }}> - </span>
                                                        <span className="addSpan" onClick={() => { AddToCart(v.id) }}> + </span>
                                                    </p>
                                                </button>
                                                :
                                                <>
                                                    <button>
                                                        <p className="text">Add to card</p>
                                                        <p className="cartIcon">
                                                            <span className="subSpan" onClick={() => { SubFrmCart(v.id) }}> - </span>
                                                            <ShoppingCart />
                                                            <span className="addSpan" onClick={() => { AddToCart(v.id) }}> + </span>
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
            </div>
        </section>
    )
}