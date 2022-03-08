import react,{useState,useEffect} from "react";
import { useHistory , useParams } from 'react-router-dom';
import axios from 'axios'

const Autopay = () =>{
    var CryptoJS = require("crypto-js");
    const history = useHistory()
    const {secretkey} = useParams()
    //console.log(secretkey)

    const tryautopay = () =>{
        const formdata = {secretkey:secretkey , id:15}
        axios.post(process.env.REACT_APP_SERVER_URL+"/tryautopay",formdata)
            .then( (response) => {
				console.log(response.data)
                history.push({
                    pathname: '/admin',
                    status:"bill_payed",
                });
            },(error)=>{
        })
        console.log(formdata)
    }
    

    useEffect(() => {
        if(localStorage.getItem('userid') != null){
            try{
                var roleBytes = CryptoJS.AES.decrypt(localStorage.getItem('role'), 'my-secret-key@123');
                var role = JSON.parse(roleBytes.toString(CryptoJS.enc.Utf8));
            }catch(err){
                localStorage.removeItem("userid")
                localStorage.removeItem("username")
                localStorage.removeItem("role")
                window.location.reload()
            }
        
            if(role != 'admin'){
                history.push({
                    pathname: '/',
                    status:"not_authorised",
                });
            }else{
                tryautopay()
            }
        }else{
            history.push({
                pathname: '/',
                status:"not_authorised",
            });
        }
        

        console.log(secretkey)
		
	},[]);


    return(
        <>
            <h1>hellooo</h1>
        </>
    )
}

export default Autopay