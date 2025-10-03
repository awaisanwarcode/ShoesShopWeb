import { useNavigate } from "react-router-dom";
import { navigateToCartPage, token } from "../../APICalls/Apicalls";
import { LucideShoppingBag } from "lucide-react";
import { useContext, useState } from "react";
import { StoreContext } from "../Context/context";
import { toast } from "react-toastify";
export const Navbar = () => {
    let { number, cartData } = useContext(StoreContext);
    let [menuBar, setMenubar] = useState(false)
    const navigate = useNavigate()
    return (
        <nav>
            <div className="nav-left" onClick={() => navigate("/")}><b>WalkWay</b></div>
            <div className="nav-right">
                <a href="/">Home</a>
                <a href="/user/orders">My Orders</a>
                <a href="#">Contact</a>
                <p onClick={() => { (number) ? navigateToCartPage(cartData) : toast.warn("Cart is empthy.") }}><LucideShoppingBag /></p>
                {(number) ? <div className={(token) ? "dot SignIn" : "dot SignUp"}>{number}</div> : <></>}
                <button onClick={() => navigate("/signup")}>{(token) ? "Sign in" : "Singn Up"}</button>
            </div>
            <div className="menuBar" onClick={() => setMenubar(!menuBar)}>
                &#9776;
            </div>
            <div className={(menuBar) ? "dropDown" : "dropDown hidden"}>
                <a href="/">Home</a>
                <hr></hr>
                <a>Men</a>
                <hr></hr>
                <a>Women</a>
                <hr></hr>
                <a onClick={() => { (number) ? navigateToCartPage(cartData) : toast.warn("Cart is empthy.") }}>Cart</a>
                <hr></hr>
                <a href="/user/orders">My Orders</a>
                <hr></hr>
                <a href="/signup" className="d-nav-lst-a">Login</a>
            </div>
        </nav>
    )
}