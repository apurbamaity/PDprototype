import react,{useState , useEffect} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './Admin.css'
import Query from './Query.jsx'
import Transaction from './Transaction.jsx' 
import Showsususer from './Showsususer.jsx' 
import Navbar from './Navbar.jsx'
import { ToastContainer,toast } from 'react-toastify';

const Home = (props) =>{
    var CryptoJS = require("crypto-js");
    const [tran,setTran] = useState([])
    const [sus,setSus] = useState([])

    const history = useHistory()
    const checkifvalid = () =>{
        try{
            var userrolebytes = CryptoJS.AES.decrypt(localStorage.getItem('role'), 'my-secret-key@123');
            var role = JSON.parse(userrolebytes.toString(CryptoJS.enc.Utf8));
        }catch(err){
            localStorage.removeItem("userid")
            localStorage.removeItem("username")
            localStorage.removeItem("role")
            window.location.reload()
        }
        
        if(role != "admin"){
            history.push({
                pathname: '/',
                status:"not_authorised",
            });
        }else{
            getalltransactions()
            getallusersuspend()
        }
        

    }

    const getalltransactions = () =>{
        axios.get(process.env.REACT_APP_SERVER_URL+"/getalltransaction",)
            .then( (response) => {
                //console.log(response.data)
                setTran(response.data)
            },(error)=>{
        })
    }

    const getallusersuspend = () =>{
        axios.get(process.env.REACT_APP_SERVER_URL+"/getallusersuspend",)
            .then( (response) => {
                //console.log(response.data)
                setSus(response.data)
            },(error)=>{
        })
    }
    useEffect(() => {
        if(localStorage.getItem('userid') != null){
            checkifvalid()
        }else{
            history.push({
                pathname: '/',
                status:"not_authorised",
            });
        }
        
        if(props.location.status == "not_authorised"){
            toast.error("You r't Authorised 💥",{
                    position:"bottom-center",autoClose:2000,
            })
        }else if(props.location.status == "bill_payed"){
            toast.success("Success",{
                    position:"bottom-center",autoClose:2000,
            })
        }
    },[]);

    return(
        <>
            <ToastContainer />
            <Navbar />
            <Query />
            <Transaction tran={tran} />
            <Showsususer sus={sus} getallusersuspend={getallusersuspend}/>
        </>
    )
}
export default Home