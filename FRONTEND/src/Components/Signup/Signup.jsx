import React,{useState} from "react";
import './Signup.css'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

import Navbar from '../LoginSignupNavbar/Navbar.jsx'
import Footer from '../Home/Footer.jsx'

const Login = () =>{

        const [formdata,setFormdata] = useState({username:"",userid:"",password:"",conpass:"",carreg:""})  
        const history = useHistory()

        const update =(event) =>{
                let val = event.target.value
                let name = event.target.name
                setFormdata((prev) => {
                        if( name === "username"){
                                return{username:val,userid:prev.userid,password:prev.password,conpass:prev.conpass,carreg:prev.carreg}
                        }else if(name ==="userid"){
                                return{username:prev.username,userid:val,password:prev.password,conpass:prev.conpass,carreg:prev.carreg}
                        }else if(name === "password"){
                                return{username:prev.username,userid:prev.userid,password:val,conpass:prev.conpass,carreg:prev.carreg}
                        }else if(name === "carreg"){
                                return{username:prev.username,userid:prev.userid,password:prev.password,conpass:prev.conpass,carreg:val}
                        }else{
                                return{username:prev.username,userid:prev.userid,password:prev.password,conpass:val,carreg:prev.carreg}
                        }
                })
                //console.log(formdata)
        } 


        const submit = () =>{
                console.log("here")
                if(formdata.password !== formdata.conpass){
                        toast.error("password not matched",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else if(formdata.username.length == 0){
                        toast.error("Enter Some Username",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else if(formdata.password.length == 0){
                        toast.error("Enter Some password",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else if(formdata.carreg.length == 0){
                        toast.error("Enter Your Car Details",{
                                position:"bottom-center",autoClose:2000,
                        })
                }
                else if(formdata.userid.includes("@")){
                        
                        axios.post(process.env.REACT_APP_SERVER_URL+"/register",formdata)
                        .then( (response) => {
                                //etProducts(response.data)
                                console.log(response)
                                if(response.data == 202){
                                        toast.success("Successfully registered , now login",{
                                                position:"bottom-center",autoClose:1000,
                                        })
                                        history.push("/signin")

                                }else if(response.data == 405){
                                        toast.error("This Email Already Present try login",{
                                                position:"bottom-center",autoClose:2000,
                                        })
                                }else if(response.data == 406){
                                        toast.error("Car Is Already Registered",{
                                                position:"bottom-center",autoClose:2000,
                                        })
                                }
                        },(error)=>{
                        })
                }else{
                        toast.error("enter a valid email-id",{
                                position:"bottom-center",autoClose:2000,
                        })
                }
        }


        return(
                <>

                        <ToastContainer />
                        <Navbar />


                        <div class="container login">
                                <div>
                                        <div class="d-flex justify-content-center mt-5">
                                                

                                                <div class="login_out p-3">
                                                        <div class="h2 text-white text-center">
                                                                Register Here
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter Username</p>
                                                                <input onChange={update} name="username" type="text" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter email id</p>
                                                                <input onChange={update} name="userid" type="email" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter password</p>
                                                                <input onChange={update} name="password" type="password" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Confirm password</p>
                                                                <input onChange={update} name="conpass" type="password" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter car reg No.</p>
                                                                <input onChange={update} name="carreg" type="text" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div class="p-small">
                                                                <span class="text-white"> already have an account. </span> 
                                                                <a href="/signin"><span style={{color:"#F1B814"}} class="make_it_pointer">Signin</span></a>
                                                        </div><br/>
                                                        <div class="text-center">
                                                                <input onClick={submit} type="submit" class="text-white p-2 h4" value="Register" />
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