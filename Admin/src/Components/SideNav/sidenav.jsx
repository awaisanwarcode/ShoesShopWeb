import { useState } from "react";
import "./sidenav.css";
export const SideNavbar = () => {
    let [hideNav, setHidnav] = useState(true)
    return (
        <>
            {/* Navbar For Large Screens */}
            <nav className="nav-tag">
                <div className="sideNav">
                    <div className="sdeNav-div">
                        <a href="/"><p className="Icon">➕</p> AddItems</a>
                    </div>
                    <div className="sdeNav-div">
                        <a href="/Admin/Orders"><p className="Icon">📃</p> Orders</a>
                    </div>
                    <div className="sdeNav-div">
                        <a href="/Admin/Items/All"><p className="Icon">🥾</p> All Items</a>
                    </div>
                </div>
            </nav>
            {/* Navbar for Small Screen based on state*/}
            {(!hideNav)
                ?
                <nav className="sld-nav-tag">
                    <div className="sideNav">
                        <div className="sdeNav-div">
                            <a href="/"><p className="Icon">➕</p> AddItems</a>
                        </div>
                        <div className="sdeNav-div">
                            <a href="/Admin/Orders"><p className="Icon">📃</p> Orders</a>
                        </div>
                        <div className="sdeNav-div">
                            <a href="/Admin/Items/All"><p className="Icon">🥾</p> All Items</a>
                        </div>
                    </div>
                </nav>
                :
                <></>
            }
            {/* Navbar OPening Btn in small Screens */}
            <div className="menuBar" onClick={() => setHidnav(!hideNav)}>
                &#9776;
            </div>
        </>
    )
}