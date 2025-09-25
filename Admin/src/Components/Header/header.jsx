import "./header.css"
export const HeaderComp = () => {
    return (
        <header>
            <span className="Ad-lft-hdr Ad-hdr-spn">
                <h1><a id="ShopName" href="http://localhost:5174">ShoesShop</a></h1>
                <p>Admin Panel</p>
            </span>
            <span className="Ad-rit-hdr Ad-hdr-spn">
                <b>🏪</b>
                <p>Admin</p>
            </span>
        </header>
    )
}