import React,{useState,useEffect} from "react";
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import './assets/Home.css'

const Feedback = (props) =>{
        var CryptoJS = require("crypto-js");

        const [question,setQuestion] = useState();
        const [faq  ,setFaq] = useState([]);
        const [rating,setRating] = useState(0)
        const [feedback,setFeedback] = useState([])
        const [comment,setComment] = useState("")

        const updatecomment = (event) =>{
                setComment(event.target.value)
                console.log(comment)
        }

        const setCommentnofunc = (x) =>{
                setRating(x)
        }

        const update = (event) =>{
                const value = event.target.value
                setQuestion(value)
        }

        const postquestion = () =>{
                const url = process.env.REACT_APP_SERVER_URL
                const formdata = {question:question}
                axios.post(process.env.REACT_APP_SERVER_URL+"/askquestion",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                window.location.reload()
                        },(error)=>{
                })
        }

        const getallfaq = () =>{
                axios.get(process.env.REACT_APP_SERVER_URL+"/getallfaq",)
                        .then( (response) => {
                                console.log(response.data)
                                setFaq(response.data)
                        },(error)=>{
                })
        }

        const getallfeedback = () =>{
                axios.get(process.env.REACT_APP_SERVER_URL+"/getallfeedback",)
                        .then( (response) => {
                                console.log(response.data)
                                setFeedback(response.data)
                        },(error)=>{
                })
        }

        const postcomment = () =>{
                if(localStorage.getItem("userid") == null){
                        toast.error("Please Login To Continue🔴",{
                                position:"bottom-center",autoClose:2000,
                        })
                }
                var useridbytes = CryptoJS.AES.decrypt(localStorage.getItem('userid'), 'my-secret-key@123');
                var userid = JSON.parse(useridbytes.toString(CryptoJS.enc.Utf8));
                
                const formdata = {userid:userid , comment:comment , rating:rating}
                axios.post(process.env.REACT_APP_SERVER_URL+"/postcomment",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                getallfeedback()
                                window.location.reload()
                        },(error)=>{
                })
        }

        useEffect(() => {
               getallfaq()
               getallfeedback()
        },[])
        return(

                <>
                        
                                <div class="mt-5">
                                <div class="container">
                                        <div class="faq p-3">

                                                <div class="h2 text-center heading text-white">FAQs</div>

                                                <div class="col">
                                                        
                                                        <div class="row">
                                                                <div>
                                                                {faq.map((d)=>(
                                                                        <div class="col py-3">
                                                                        <div class="p-large question">
                                                                                {d.question}
                                                                        </div>
                                                                        <div class="p-small text-white">
                                                                               {d.answer}
                                                                        </div>
                                                                        </div>
                                                                ))}
                                                                </div>
                                                        </div>
                                                </div>

                                                <div class="col text-center">
                                                        <input type="submit" value="read all queries" class="btn read_all text-white h4"/>
                                                </div>

                                        </div>
                                </div>


                                </div>


                                <div class="container mt-5">
                                        <div class="hero_pay_bills Feedback p-3">
                                                
                                                <div class="row ">
                                                        <div class="h5 query_box col-lg-10 col-9">
                                                                <input onChange={update} type="text" placeholder="ask a query" />
                                                        </div>

                                                        <div class="h4 col-lg-1 col-1">
                                                                <input onClick={postquestion}  type="submit" value="ask" class="btn float-right"/>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <div class="container mt-5">
                                        <div class="hero_pay_bills Feedback p-3">
                                                <div class="row text-white ">
                                                        <Comment no = {rating} noChange = {setCommentnofunc} />
                                                </div><br/>
                                                <div class="row ">
                                                        <div class="h5 query_box col-lg-10 col-9">
                                                                <input onChange={updatecomment} type="text" placeholder="Give Your Feedback" />
                                                        </div>

                                                        <div class="h4 col-lg-1 col-1">
                                                                <input onClick={postcomment}  type="submit" value="post" class="btn float-right"/>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <Userfeedback feedback={feedback} />

                
                </>
        )



}

const Userfeedback = (props) =>{
        return(
                <>
                    <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">All Feedback</div>
                                <div class="row">
                                {props.feedback.map((d)=>(
                                        <>
                                                <div class="col-lg-4 p-2 card_out">
                                                         <div>
                                                                <div class="card p-3">
                                                                        <div class="p-small">
                                                                                <span style={{color:"#F1B814"}}>User ID</span> #{d.userid}
                                                                        </div>
                                                                        <div class="h6">
                                                                                <span style={{color:"#F1B814"}}>{d.comment}</span> 
                                                                        </div>
                                                                        <div class="h6">
                                                                                <Comment no={d.rating}/> 
                                                                        </div>
                                                                <div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                </>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )
}

const Comment = (props) =>{
        if(props.no === 0){
                return (
                        <>
                                <span>
                                        <i class="fa fa-star-o fa-2x px-2 text-white" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2 text-white" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2 text-white" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2 text-white" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2 text-white" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }else if (props.no === 1){
                return (
                        <>
                                <span>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }else if (props.no === 2){
                return (
                        <>
                                <span>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }else if (props.no === 3){
                return (
                        <>
                                <span>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }else if (props.no === 4){
                return (
                        <>
                                <span>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star-o fa-2x px-2" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }else{
                return (
                        <>
                                <span>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(1)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(2)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(3)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(4)} aria-hidden="true"></i>
                                        <i class="fa fa-star fa-2x px-2" onClick={() => props.noChange(5)} aria-hidden="true"></i>
                                </span>
                        </>
                )
        }
}

export default Feedback;