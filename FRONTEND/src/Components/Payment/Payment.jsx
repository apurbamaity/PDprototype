import React,{useState,useEffect} from "react";
import './Payment.css'
import { ToastContainer,toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

import Navbar from '../LoginSignupNavbar/Navbar.jsx'
import Footer from '../Home/Footer.jsx'
import axios from 'axios'

const Choosepayment = (props) =>{
        var CryptoJS = require("crypto-js");
        if(props.option === 0){
                return(
                        <>


                        <div onClick={() => props.setoption(1)} class="option p-1 text-center make_it_pointer">
                                <h3>Card</h3>
                        </div><br/>

                        <div onClick={() => props.setoption(2)} class="option p-1 text-center make_it_pointer">
                                <h3>Net Banking</h3>
                        </div><br/>
                        
                        
                        </>
                )
        }else if(props.option === 1){
                return(
                        <>


                        <div onClick={() => props.setoption(1)} class="option_focus p-1 text-center make_it_pointer">
                                <h3>Card</h3>
                        </div><br/>

                        <div onClick={() => props.setoption(2)} class="option p-1 text-center make_it_pointer">
                        <h3>Net Banking</h3>
                        </div><br/>
                        
                        
                        </>
                )
        }else if(props.option === 2){
                return(
                        <>


                        <div onClick={() => props.setoption(1)} class="option p-1 text-center make_it_pointer">
                                <h3>Card</h3>
                        </div><br/>

                        <div onClick={() => props.setoption(2)} class="option_focus p-1 text-center make_it_pointer">
                        <h3>Net Banking</h3>
                        </div><br/>
                        
                        
                        </>
                )
        }
}

const Payment = () =>{

        const history = useHistory()
        var CryptoJS = require("crypto-js");

        const [option,setOption] = useState(0);
        const [fund,setFund] = useState(0);

        const update = (event) =>{
                setFund(event.target.value)
                console.log(fund)
        }
        const recharge = () =>{
                console.log( parseInt(fund ) );
                if( parseInt(fund) <=0   ){
                        toast.error("Enter A Valid Fund 🔴",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else if(option == 0){
                        toast.error("Choose An Payment Method 🔴",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else{
                        var CryptoJS = require("crypto-js");

		        try{
                                var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                                var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                        }catch(err){
                                localStorage.removeItem("userid")
                                localStorage.removeItem("username")
                                localStorage.removeItem("role")
                                history.push({
                                        pathname: '/',
                                        //status:"recharge_success",
                                });
                        }
                        const formdata = { userid:userid , availablebill:fund}
                        axios.post(process.env.REACT_APP_SERVER_URL+"/recharge",formdata)
                        .then( (response) => {
                                history.push({
                                        pathname: '/',
                                        status:"recharge_success",
                                });
                        },(error)=>{
                        })
                }
        }

        const setoption = (x) =>{
                setOption(x)
        }
        useEffect(() => {
                if(localStorage.getItem('userid') != null){
                        
                        try{
                                try{
                                        var roleBytes = CryptoJS.AES.decrypt(localStorage.getItem('role'), 'my-secret-key@123');
                                        var role = JSON.parse(roleBytes.toString(CryptoJS.enc.Utf8));
                                }catch(err){
                                        localStorage.removeItem("userid")
                                        localStorage.removeItem("username")
                                        localStorage.removeItem("role")
                                        window.location.reload()
                                }
                                
                                if(role == 'admin'){
                                        history.push({
                                                pathname: '/admin',
                                                status:"not_authorised",
                                        });
                                }
                        }catch(error){

                        }
               }else{
                history.push({
                        pathname: '/',
                        status:"not_authorised",
                });
               }
        })
        return(
                <>

                        <ToastContainer />
                        <Navbar />
                        <div class="container login">
                                <div>
                                        <div class="d-flex justify-content-center mt-5">
                                                

                                                <div class="login_out p-3">
                                                        <div class="h2 text-white text-center">
                                                                Top Up wallet
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Enter the ammount to top up</p>
                                                                <input onChange={update} type="number" class="text-white p-2" placeholder="" />
                                                        </div><br/>
                                                        <div>
                                                                <p class="p-small text-white">Choose a payment option</p>
                                                        </div>

                                                        <Choosepayment option={option} setoption={setoption} />
                                                        
                                                        <div class="text-center">
                                                                <input onClick={recharge} type="submit" class="text-white p-2 h4" value="Top Up" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <Footer />
                </>
        )

}

export default Payment