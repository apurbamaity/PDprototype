import react from "react";
import React,{useState,useEffect} from "react";
import axios from 'axios'
import './Admin.css'

const Query = () =>{

        const [answer,setAnswer] = useState();
        const [query  ,setQuery] = useState([]);

        const update = (event) =>{
                const value = event.target.value
                setAnswer(value)
        }

        const postanswer = (id) =>{
                const url = process.env.REACT_APP_SERVER_URL
                const formdata = {id:id , answer:answer}
                axios.post(process.env.REACT_APP_SERVER_URL+"/answerquestion",formdata)
                        .then( (response) => {
                                console.log(response.data)
                                getallnotansweredquery()
                        },(error)=>{
                })
        }

        const getallnotansweredquery = () =>{
                axios.get(process.env.REACT_APP_SERVER_URL+"/getallnotansweredquery",)
                        .then( (response) => {
                                console.log(response.data)
                                setQuery(response.data)
                        },(error)=>{
                })
        }

        useEffect(() => {
            getallnotansweredquery()
        },[])
        return(

            <>
                        
                <div class="mt-5">
                    <div class="container">
                        <div class="faq p-3">
                            <div class="h2 text-center heading text-white">All Queries</div>
                                <div class="col">
                                    <div class="row">
                                        <div>
                                            {query.map((d)=>(
                                                <div class="col">
                                                    <div class="p-large question"> {d.question}</div> <br />
                                                    <div class="answer_query_in Feedback p-3">
                                                        <div class="row ">
                                                            <div class="h5 query_box col-lg-10 col-9">
                                                                <input onChange={update} type="text" placeholder="answer this query" />
                                                            </div>
                                                            <div class="h4 col-lg-1 col-1">
                                                                <input onClick={() => postanswer(d.id)}  type="submit" value="OK" class="btn float-right"/>
                                                            </div>
                                                        </div>
                                                    </div>             
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </>
        )



}

export default Query;