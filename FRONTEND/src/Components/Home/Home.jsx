import React,{useState,useEffect} from "react";
import './assets/Home.css'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

import Navbar from './Navbar'
import Hero from './Hero'
import Bill from './Bill'
import Feedback from './Feedback'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Showtransaction from './Showtransaction'


const Home = (props) =>{
        const history = useHistory()
        var CryptoJS = require("crypto-js");
        const [userdetail , setUserdetail] = useState({userid:"",duebill:"0",availablebill:"0",username:""})
        const [transaction , setTransaction] = useState([])

        const getuserdetails = () =>{

                
                try{
                        var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                        var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                }catch(err){
                        localStorage.removeItem("userid")
                        localStorage.removeItem("username")
                        localStorage.removeItem("role")
                        window.location.reload()
                }

                if(userid != null){
                        const url = process.env.REACT_APP_SERVER_URL
                        const formdata = {userid:userid}
                        axios.post(process.env.REACT_APP_SERVER_URL+"/getuserdetails",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                setUserdetail(response.data)
                        },(error)=>{

                        })
                }
        }

        const getusertransaction = () =>{

                try{
                        var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                        var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                }catch(err){
                        localStorage.removeItem("userid")
                        localStorage.removeItem("username")
                        localStorage.removeItem("role")
                        window.location.reload()
                }

                if(userid != null){
                        const url = process.env.REACT_APP_SERVER_URL
                        const formdata = {userid:userid}
                        axios.post(process.env.REACT_APP_SERVER_URL+"/getusertransaction",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                setTransaction(response.data)
                        },(error)=>{
                        })
                }
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
                        getuserdetails()
                        getusertransaction()
               }
                
                if(props.location.status === "signin_success"){
                        window.location.reload()
                }else if(props.location.status === "recharge_success"){
                        window.location.reload()
                }else if(props.location.status === "not_authorised"){
                        toast.error("You r't authorised 🚫",{
                                position:"bottom-center",autoClose:2000,
                        })
                }

        },[]);
        const update = (event) =>{
                console.log(event.target.value)
        }


        return(
                <>
                        {/*<h1>{window.innerWidth}</h1>*/}
                        {/*<input type="datetime-local" onChange={update} style={{width:"100%",borderRadius:"20px",backgroundColor:"lightgreen",border:"5px solid red"}}/>*/}
                        <ToastContainer />
                        <Sidebar userdetail={userdetail} />
                        <Navbar userdetail={userdetail}/>
                        <Hero userdetail={userdetail} getuserdetails={getuserdetails} />
                        <Bill userdetail={userdetail} getuserdetails={getuserdetails} getusertransaction={getusertransaction}/>
                        <Showtransaction transaction={transaction} />
                        <Feedback />
                        <Footer />
                </>
        )
}

export default Home