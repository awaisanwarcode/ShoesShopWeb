import "./AddItems.css"
import { useState } from "react";
import { SideNavbar } from "../../Components/SideNav/sidenav";
import { HeaderComp } from "../../Components/Header/header";
import { AddItem } from "../../ApiCalls/ApiCalls";
import { toast, ToastContainer } from "react-toastify";
export const AddItemsPage = () => {
    let [image, setImage] = useState("");
    let [data, setData] = useState({
        productName: "",
        productCatagory: undefined,
        productDesc: "",
        productPrice: "",
    });
    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setData(prevData => ({ ...prevData, [name]: value }));
    }
    const formSubmission = (e) => {
        e.preventDefault();
        if (!image || !data.productCatagory || data.productCatagory === "N/A") {
            toast.error("Fill the fields first");
        } else {
            data["image"] = image;
            let formData = new FormData;
            formData = data;
            AddItem(formData);
            setImage("");
        }
    }
    return (
        <>
            <HeaderComp />
            <ToastContainer />
            <section className="Ad-Sec-Add-Itm Ad-Sec">
                <SideNavbar />
                <form onSubmit={(e) => formSubmission(e)} encType="multipart/form-data" className="Ad-Sec-frm">
                    <div className="formComp">
                        <label htmlFor="image">
                            {(image !== "")
                                ?
                                <>
                                    <img src={URL.createObjectURL(image)} className="previewImg" alt="Item Image"></img>
                                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                </>
                                :
                                <>
                                    <span className="defaultImage">
                                        <p className="uploadSign">📤</p>
                                        <p className="uploadPara">Upload Image</p>
                                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                    </span>
                                </>
                            }
                        </label>
                    </div>
                    <div className="formComp">
                        <p>Product name</p>
                        <input value={data.productName} type="text" placeholder="Burger , Bread etc" onChange={(e) => changeHandler(e)} required className="productInp" name="productName" />
                    </div>
                    <div className="formComp">
                        <p>Product Description</p>
                        <textarea value={data.productDesc} type="text" placeholder="Enter description about the food item here.." onChange={(e) => changeHandler(e)} name="productDesc" required />
                    </div>
                    <div className="formComp shortInputs-div">
                        <span className="slct-spn">
                            <p>Select Catagory</p>
                            <select value={data.productCatagory}
                                onChange={(e) => changeHandler(e)} name="productCatagory">
                                <option>N/A</option>
                                <option>Normal</option>
                                <option>Sandels</option>
                                <option>Sneakers</option>
                            </select>
                        </span>
                        <span>
                            <p>Product Price</p>
                            <input value={data.productPrice} placeholder="$20" name="productPrice" onChange={(e) => changeHandler(e)} type="number" required />
                        </span>
                    </div>
                    <div className="formComp">
                        <button className="Addbtn">Add</button>
                    </div>
                </form>
            </section>
        </>
    )
}