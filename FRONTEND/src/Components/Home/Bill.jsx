import React,{useState,useEffect} from "react";
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';

const Bills = (props) =>{
    console.log("size",props.duebill.size)
    
    if(props.duebill.length > 0){
        return(
            <>
            {props.duebill.map((d)=>(
                <>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2 card_out">
                        <div>
                            <div class="card p-3">
                                <div class="p-small">
                                    <span style={{color:"#F1B814"}}>bill ID</span> #{d.billid}
                                </div>
                                <div class="h1">
                                    <span style={{color:"#F1B814"}}>rs. {d.ammount}</span> 
                                </div>
                                    <div>
                                        <div onClick={() => props.paythisbill(d.id , d.ammount)} class="pay_now make_it_pointer h3 text-center p-1">
                                            Pay Now
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            </>
        )
    }else{
        return(
            <>
                <div class="h5 text-center text-warning">You Don't Have Any Due Bills</div>
            </>
        )
    }
}

const Bill = (props) =>{
    var CryptoJS = require("crypto-js");
    const [duebill,setDuebill] = useState([]);

        const getallbills = () =>{

            try{
                var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
            }catch(err){
                localStorage.removeItem("userid")
                localStorage.removeItem("username")
                localStorage.removeItem("role")
                window.location.reload()
            }
                const url = process.env.REACT_APP_SERVER_URL
                const formdata = {userid:userid}
                axios.post(process.env.REACT_APP_SERVER_URL+"/getallduebills",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                setDuebill(response.data)
                        },(error)=>{
                })
        }

        const paythisbill = (billid , ammount) =>{
            console.log("herererer",billid)
            if ( parseInt(props.userdetail.availablebill) < parseInt(ammount) ) {
                toast.error("Rechatge Your Account 🔴",{
                    position:"bottom-center",autoClose:2000,
                })
            }else{
                
		        var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                const formdata = {id:billid , userid:userid }
                
                axios.post(process.env.REACT_APP_SERVER_URL+"/paysinglebill",formdata)
                    .then( (response) => {
                        if(response.data == 202){
                            toast.success("Bill Payed Successfully 🔴",{
                                position:"bottom-center",autoClose:2000,
                            })
                            getallbills()
                            props.getuserdetails()
                            props.getusertransaction()
                        }else{
                            toast.error("Some Error Occured !! sorry 🔴",{
                                position:"bottom-center",autoClose:2000,
                            })
                        }
                        
                    },(error)=>{
                })
            }
        }

        useEffect(() => {
                if(localStorage.getItem("userid") != null)
                    getallbills()
        },[]);

        if(localStorage.getItem("userid") == null){
            return(
                <>
                    <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h5 text-center">Or Pay Every Bill Individually</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }else{

        return(
                <>
                    <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">All Due Bills</div>
                                <div class="row">
                                    <Bills duebill={duebill} paythisbill={paythisbill}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )

        }
}

export default Bill