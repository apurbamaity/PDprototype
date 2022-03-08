import react,{useState , useEffect} from "react";

const Showtransaction = (props) =>{
    if(localStorage.getItem("userid") == null){
        return(
            <>
                <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">Explore All Your Transaction</div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
    if(props.transaction.length > 0){
        return(
            <>
                <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">All Transactions</div>
                                <div class="row">
                                    {props.transaction.map((d)=>(
                                        <>
                                            <div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2 card_out">
                                                <div>
                                                    <div class="card p-3">
                                                        <div class="p-small">
                                                            <span style={{color:"#F1B814"}}>bill ID</span> #{d.billid}
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
    }else{
        return(
            <>
                <div class="mt-5">
                        <div class="container">
                            <div class="bill p-3">
                                <div class="h2 text-center">All Transactions</div>
                                <div class="h5 text-center">You dont have any transaction</div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default Showtransaction