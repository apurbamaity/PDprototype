import axios from 'axios';
import react,{useState,useEffect} from 'react';
import { ToastContainer,toast } from 'react-toastify';
import './assets/Home.css'



const Herosection = (props) =>{

        if(localStorage.getItem("userid") == null){
                return(
                        <>
                                <div class="col-lg-6 col-md-12 col-12 meke_flex">

                                        <div class="h1 text-center">
                                                FORGET LINE <br/> <span style={{color:"#bd1e51"}}>PAY TAX ANYTIME</span>
                                        </div>

                                        <div class="py-3 head_btn p-large text-danger d-flex flex-direction-row">
                                                <a href="/signin" class="px-2"><input type="submit" class="btn btn-info w-100 " value="Sign In" /></a>
                                                <a href="/signup"><input type="submit" class="btn btn-success w-100 " value="Sign Up" /></a>
                                        </div> 
                                         
                                </div>
                        
                        </>
                )
        }else{

                return(
                        <>
                        
                        <div class="col-lg-6 col-md-12 col-12 user_wallet ">

                                <div class="p-3">
                                                                
                                        <div class="text-center text-white p-large mt-lg-5">
                                                 User ID :: <span style={{color:"#F1B814"}}>{props.userdetail.userid}</span>
                                        </div>
                                        <div class="text-center text-white p-large">
                                                 Car Details :: <span style={{color:"#F1B814"}}>{props.userdetail.carreg}</span>
                                        </div>

                                        <div class="text-center text-white mt-lg-3">
                                                <span style={{color:"#F1B814"}}>Wallet Balance    </span>
                                                <span class="h1 px-3" style={{color:"#F1B814"}}>rs. {props.userdetail.availablebill}</span>
                                        </div>

                                        <a href="/payment"><div class="make_it_pointer pay_now h3 text-center p-1 text-white mt-lg-3">
                                                                        Recharge Now
                                        </div> </a>

                                 </div> 
                                         
                        </div>
                        
                        </>
                )
        }
}


const Paywholebill = (props) =>{
        var CryptoJS = require("crypto-js");
        const paywholebill = () =>{
                try{
                        const useridLocal = localStorage.getItem('userid')
	                var useridbytes = CryptoJS.AES.decrypt(useridLocal, 'my-secret-key@123');
                        var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                }catch(err){
                        localStorage.removeItem("userid")
                        localStorage.removeItem("username")
                        localStorage.removeItem("role")
                        window.location.reload()
                }
                const formdata = {userid:userid}
                if( parseInt ( props.userdetail.availablebill) < parseInt ( props.userdetail.duebill )){
                        toast.error("Recharge Your Account 🔴",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else if(    parseInt ( props.userdetail.duebill ) == 0    ){
                        toast.error("You r all clear 👍",{
                                position:"bottom-center",autoClose:2000,
                        })
                }else{
                        axios.post(process.env.REACT_APP_SERVER_URL+"/paywholebill",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                props.getuserdetails()
                                window.location.reload()
                                toast.success("Bill Payed Successfully",{
                                        position:"bottom-center",autoClose:2000,
                                })
                        },(error)=>{
                        })
                }
        }
        if(localStorage.getItem('userid') == null){
                return(
                        <>
                        <div class="container">
                                <div class="hero_pay_bills p-3 text-center">
                                                <div class="h3">Pay your all due bills together</div>
                                        </div>
                                </div>
                        </>
                )
        }else{
                return(
                        <>
                                <div class="container">
                                        <div class="hero_pay_bills p-3">
                                                <div class="d-flex flex-row justify-content-between">
                                                        <div class="h4 ">
                                                        total due   <span class="p-large due_bill p-2" style={{color:""}}>rs. {props.userdetail.duebill}</span>
                                                        </div>

                                                        <div class="h4">
                                                                <input onClick={paywholebill} type="submit" value="pay" class="btn"/>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </>
                )
        }
}




const Hero =(props)=>{


        const [team,setTeam] = useState([]);
       // const [userdetail , setUserdetail] = useState({userid:"",duebill:"0",availablebill:"0"})
        

        /*const getuserdetails = () =>{
                const userid = localStorage.getItem("userid")
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
        }*/


        

        useEffect(() => {
                //getuserdetails()
        },[]);


        return(
                <>



                        <div class="Hero">


                                <div class="container mt-5">
                                        <div class="row">
                                                <div class="col-lg-6 col-md-12 col-12 text-danger text-center">
                                                        <img 
                                                        src="https://cdn.dribbble.com/users/972816/screenshots/3090576/icon_portfolio31.png" style={{width:"80%"}}
                                                         />
                                                </div>
                                                <Herosection userdetail={props.userdetail}/>
                                         </div>
                                </div> <br/>
                               <Paywholebill userdetail={props.userdetail} getuserdetails={props.getuserdetails}/>






                        </div>
                        



                </>
        )
}

export default Hero