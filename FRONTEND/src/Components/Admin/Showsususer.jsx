import react from "react";
import React,{useState,useEffect} from "react";
import axios from 'axios'
import './Admin.css'

const Showsususer = (props) =>{

    const suspend = (userid) =>{
        const data = {userid:userid}
        axios.post(process.env.REACT_APP_SERVER_URL+"/suspenduser",data)
            .then( (response) => {
                console.log(response.data)
                props.getallusersuspend()
            },(error)=>{
        })
    }
    return(
            <>
                    <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">Over limit Acc.</div>
                                <div class="row">
                                    {props.sus.map((d)=>(
                                        <>
                                            <div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2 card_out">
                                                <div>
                                                    <div class="card p-3">
                                                        <div class="p-small">
                                                            <span style={{color:"#F1B814"}}>User Id</span> {d.userid}
                                                        </div>
                                                        <div class="">
                                                            <span class="h5" style={{color:"#F1B814"}}>Total Due </span>
                                                            <span class="h1" style={{color:"#F1B814"}}>rs. {d.duebill}</span> 
                                                        </div>
                                                        <div>
                                                            <div onClick={() => suspend(d.userid)} class="pay_now make_it_pointer h3 text-center p-1">
                                                                 Suspend Now
                                                            </div>
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

export default Showsususer;