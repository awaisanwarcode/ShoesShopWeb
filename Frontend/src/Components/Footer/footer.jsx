import "./footer.css";
export const Footer = () => {
    return (
        <footer className="site-footer" aria-label="Shoes shop footer">
            <div className="footer-top">
                <div className="brand">
                    <div className="logo">
                        <div className="icon">SS</div>
                    </div>
                    <p>Free delivery over PKR 10,000 · 30-day returns · 1-year warranty</p>
                </div>

                <div className="navs" role="navigation" aria-label="Footer navigation">
                    <div className="nav-col">
                        <h4>Shop</h4>
                        <a href="#">Men</a>
                        <a href="#">Women</a>
                        <a href="#">Kids</a>
                        {/* <a href="#">Sale</a> */}
                    </div>

                    <div className="nav-col">
                        <h4>Company</h4>
                        <a href="#">About us</a>
                        <a href="#">Press</a>
                        <a>F8 , Islamabad , Pakistan</a>
                    </div>

                    <div className="nav-col">
                        <h4>Support</h4>
                        <a href="#">Contact</a>
                        <a href="#">Order tracking</a>
                    </div>
                </div>
            </div>
            <hr className="sep" />
            <div className="footer-bottom">
                <div className="footer-copy">
                    <div className="copy">© 2025 ShoesShop — All rights reserved</div>
                </div>
            </div>
        </footer>
    )
}