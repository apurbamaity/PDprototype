import React,{useState} from "react";
import './Login.css'

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'



import Navbar from '../LoginSignupNavbar/Navbar.jsx'
import Footer from '../Home/Footer.jsx'

import axios from 'axios'

const Login = () =>{
        var CryptoJS = require("crypto-js");
        let history = useHistory();

        const [formdata,setFormdata] = useState({userid:"",password:""})
        const update =(event) =>{
                let val = event.target.value
                let name = event.target.name
                setFormdata((prev) => {
                        if( name === "userid"){
                                return{userid:val,password:prev.password}
                        }else{
                                return{userid:prev.userid,password:val}
                        }
                })
        } ;

        const submit = () =>{
                axios.post(process.env.REACT_APP_SERVER_URL+"/signin",formdata)
                        .then( (response) => {
                                //console.log(response)
                                if(response.data == 401){

                                        toast.error("This email not exist , register",{
                                                position:"bottom-center",autoClose:2000,
                                        })
                                }else if(response.data == 402){
                                        toast.error("Password dont match",{
                                                position:"bottom-center",autoClose:2000,
                                        })
                                }else{
                                        console.log("here")
                                        const formdata1 = {userid:formdata.userid}
                                        axios.post(process.env.REACT_APP_SERVER_URL+"/getuserwhensignin",formdata)
                                        .then( (response) =>{

                                                var useridEnc = CryptoJS.AES.encrypt(JSON.stringify(response.data.userid), 'my-secret-key@123').toString();
                                                localStorage.setItem("userid", useridEnc);

                                                var usernameEnc = CryptoJS.AES.encrypt(JSON.stringify(response.data.username), 'my-secret-key@123').toString();
                                                localStorage.setItem("username",usernameEnc)

                                                var roleEnc = CryptoJS.AES.encrypt(JSON.stringify(response.data.role), 'my-secret-key@123').toString();
                                                localStorage.setItem("role",roleEnc)

                                                if(response.data.role == 'admin'){
                                                        history.push({
                                                                pathname: '/admin',
                                                                status:"signin_success",
                                                        });   
                                                }else{
                                                        history.push({
                                                                pathname: '/',
                                                                status:"signin_success",
                                                        });
                                                }
                                                
                                        } , (error)=>{

                                        })
                                        
                                        
                                }
                        },(error)=>{



                })
        };

        return(
                <>

                        <ToastContainer />
                        <Navbar />
                        <div class="container login">
                                <div>
                                        <div class="d-flex justify-content-center mt-5">
                                                

                                                <div class="login_out p-3">
                                                        <div class="h2 text-white text-center">
                                                                Log In Here
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter email id</p>
                                                                <input onChange={update} type="email" class="text-white p-2" name="userid" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter password</p>
                                                                <input onChange={update} type="password" class="text-white p-2" name="password" placeholder="" />
                                                        </div><br/>
                                                        <div class="p-small">
                                                                <span class="text-white"> don't have an account. </span> 
                                                                <a href="/signup"><span style={{color:"#F1B814"}} class="make_it_pointer">Register</span></a>
                                                        </div><br/>
                                                        <div class="text-center">
                                                                <input onClick={submit} type="submit" class="text-white p-2 h4" value="Log In" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <Footer />
                </>
        )

}

export default Login