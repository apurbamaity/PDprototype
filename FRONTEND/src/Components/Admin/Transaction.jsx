import react from "react";
import React,{useState,useEffect} from "react";
import axios from 'axios'
import './Admin.css'

const Transaction = (props) =>{
    return(
            <>
                    <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">All Transaction</div>
                                <div class="row">
                                    {props.tran.map((d)=>(
                                        <>
                                            <div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2 card_out">
                                                <div>
                                                    <div class="card p-3">
                                                        <div class="p-small">
                                                            <span style={{color:"#F1B814"}}>bill ID</span> #{d.billid}
                                                        </div>
                                                        <div class="p-small">
                                                            <span style={{color:"#F1B814"}}>Payd By</span> #{d.userid}
                                                        </div>
                                                        <div class="p-small">
                                                            <span style={{color:"#F1B814"}}>Payd On</span> {d.date}
                                                        </div>
                                                        <div class="h1">
                                                            <span style={{color:"#F1B814"}}>rs. {d.ammount}</span> 
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

export default Transaction;