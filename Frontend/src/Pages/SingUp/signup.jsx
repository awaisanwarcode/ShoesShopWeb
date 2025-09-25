import "./signup.css";
import { Navbar } from "../../Components/Header/navbar";
import { useState } from "react";
import { sendAuthData } from "../../APICalls/Apicalls";
export const SingupPage = () => {
    let [formName, setFormname] = useState("SignUp");
    let [message, setMessage] = useState();
    let [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    }
    const formSubmitted = (e) => {
        e.preventDefault();
        if (formName !== "SignUp") {
            data["name"] = undefined
            sendAuthData(data, setMessage)
        } else {
            sendAuthData(data, setMessage)
        }
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="signip-main">
                <section id="signUpSec">
                    <form className="signup-sec-part" onSubmit={(e) => formSubmitted(e)}>
                        <h2>{formName}</h2>
                        {(formName === "SignUp")
                            ?
                            <div className="formComp">
                                <p>Enter your name :</p>
                                <input type="text" value={data.name} name="name" required onChange={((e) => handleChange(e))} />
                            </div>
                            :
                            <></>
                        }
                        <div className="formComp">
                            <p>Enter our email :</p>
                            <input type="email" name="email" value={data.email} required onChange={((e) => handleChange(e))} />
                        </div>
                        <div className="formComp">
                            <p>Enter your Password : </p>
                            <input type="password" name="password" value={data.password} required onChange={((e) => handleChange(e))} />
                        </div>
                        {
                            (message)
                                ?
                              <div className="formComp">
                                  <p className="msgPara">{message}</p>
                              </div>
                                :
                                <></>

                        }
                        <div className="formComp form-btnDiv">
                            <button type="submit"> {(formName === "SignUp") ? "Create Account " : "Log In "} </button>
                        </div>
                        {(formName === "SignUp")
                            ?
                            <div className="formComp termsDiv">
                                <input type="checkbox" className="checkBox" required />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            :
                            <></>
                        }
                        {(formName === "SignUp")
                            ?
                            <div className="last-div">
                                <p>Already have an account ? <span className="pageChanger" onClick={() => setFormname("LogIn")}>Login here</span></p>
                            </div>
                            :
                            <div className="last-div">
                                <p>Create new account : <span className="pageChanger" onClick={() => setFormname("SignUp")}> Click here</span></p>
                            </div>
                        }
                    </form>
                </section>
            </main>
        </>
    )
}