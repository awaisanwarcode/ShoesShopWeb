import { useEffect, useState } from "react"
import { HeaderComp } from "../../Components/Header/header"
import { SideNavbar } from "../../Components/SideNav/sidenav"
import "./Allitems.css"
import { baseUrl, delItmByAdm, getAllItems } from "../../ApiCalls/ApiCalls"
export const AllItemsPage = () => {
    let [Allitems, setAllItems] = useState();
    useEffect(() => {
        getAllItems(setAllItems)
    }, []);
    return (
        <>
            <HeaderComp />
            <section className="Ad-Sec">
                <SideNavbar />
                <div className="Ad-All-itm-Cont">
                    <div className="Ad-hdr-All-itm-div itms-Cont">
                        <p>Img</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Action</p>
                    </div>
                    {(Allitems)
                        ?
                        Allitems.map((v, i) => {
                            return (
                                <div className="itms-Cont" key={i}>
                                    <img src={`${baseUrl}/Images/${v.image}`} alt="Item Pic" />
                                    <p>{v.name}</p>
                                    <p>{v.price}</p>
                                    <button className="del-btn" onClick={() => delItmByAdm(v.image ,v.id)}>x</button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                </div>
            </section>
        </>
    )
}