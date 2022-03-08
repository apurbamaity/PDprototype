import react,{useState,useEffect} from "react";
import './assets/Home.css'
import axios from "axios"
import QRCode from "qrcode.react";

const Username = (props) =>{
	const [username,setUsername] = useState()
	const update = (event) =>{
		setUsername(event.target.value)
	}

	const changeUsername = () =>{
		var CryptoJS = require("crypto-js");
		var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
        var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
		const formdata = ( {userid:userid , username:username})
		console.log("here")
		axios.post(process.env.REACT_APP_SERVER_URL+"/changeUsername",formdata)
            .then( (response) => {
				console.log(response.data)
				window.location.reload()
            },(error)=>{
        })


	}

	if(props.edit == 0){
		return(
			<>
				<div>
                    <p class="p-large text-black">Your username <span onClick={() => props.changeedit(1)} class="logout1 px-2 make_it_pointer">Edit</span>   </p>
                    <div class="text h4 p-3">{props.userdetail.username}</div>
                </div><br/>
			</>
		)
	}else{
		return(
			<>
				<div>
                    <p class="p-large text-black">Your username <span onClick={changeUsername} class="logout1 px-2 make_it_pointer">Its Ok</span>   </p>
                    <input onChange={update} type="text" class="text h6 p-3" placeholder="enter new username"/>
                </div><br/>
			</>
		)
	}
}

const Sidebar = (props)=>{

	const logout = () =>{
		localStorage.removeItem("userid")
		window.location.reload()
	}

	const [edit,setEdit] = useState(0)
	const [userdetails,setUserdetails] = useState({})

	const changeedit = (x) =>{
		setEdit(x)
	}

	useEffect(() => {
		//getuserdetails()
	},[]);
    return(
        <>
            <div class="sidebar p-5">
                <div class="mt-5">
                	<div class="cross h4 p-1 text-center make_it_pointer">❌</div>
					<Username edit={edit} changeedit={changeedit} userdetail={props.userdetail} />
                    <div>
                        <p class="p-large text-black">Your User Id</p>
                        <div class="text h6 p-3">{props.userdetail.userid}</div>
                    </div><br/>
					
					<div>
						<p class="p-large text-black">Your QR Code</p>
            			<QRCode value={"https://prototypefront.herokuapp.com/autopay/"+props.userdetail.secretkey}style={{ marginRight: 50 }}/>
         			</div>
					 {/*<a href={"http://localhost:3000/autopay/"+props.userdetail.secretkey}style={{ marginRight: 50 }}>click</a>*/}
					<div class="text-center">
                        <div onClick={logout} class="logout h4 py-1 px-3 make_it_pointer  text-center">LogOut</div>
                    </div><br/>
                </div>
            </div>
        </>
    )
}

export default Sidebar