import { useNavigate } from "react-router-dom";
import { token } from "../../APICalls/Apicalls";
import { LucideShoppingBag } from "lucide-react";
import { useState } from "react";
export const Navbar = () => {
    let [menuBar, setMenubar] = useState(false)
    const navigate = useNavigate()
    return (
        <nav>
            <div className="nav-left" onClick={() => navigate("/")}><b>ShoesShop</b></div>
            <div className="nav-right">
                <a href="/">Home</a>
                <a href="/user/orders">My Orders</a>
                <a href="#">Contact</a>
                <div className="dot"></div>
                <a href="/cart"><LucideShoppingBag /></a>
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
                <a href="/cart">Cart</a>
                <hr></hr>
                <a href="/user/orders">My Orders</a>
                <hr></hr>
                <a href="/signup" className="d-nav-lst-a">Login</a>
            </div>
        </nav>
    )
}