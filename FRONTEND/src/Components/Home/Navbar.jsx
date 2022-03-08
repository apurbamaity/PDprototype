import react from 'react';
import './assets/Home.css'


const Suspended = (props) =>{
        if(props.userdetail.status == "suspended"){
                return(
                        <>
                                <div class="text-center">
                                        <span class="h5 text-danger">Your Account Is On Hold</span>
                                </div>
                        </>
                )
        }else{
                return(
                        <>
                        </>
                )
        }
}

const Nav = (props) =>{
        


        const logout = () =>{
                localStorage.removeItem('userid');
        }



        const userid = localStorage.getItem('userid')
        if(userid == null){

                return(
                        <>

                                <nav class="navbar navbar-expand-md1 ">
                                        <div class="container">
                                        <a href="/"> <span class=""> <h4 class="logotext">  TOLLKEEP  </h4>       </span></a>

                                        <span class=""> 
                                                <a class="h6" href="/signin"><span class="href"> Signin</span></a>
                                        </span>
                                        </div>
                                </nav>


                        </>
                )
        }else{
                return(
                        <>

                                <nav class="navbar navbar-expand-md1 px-lg-3 px-3">

                                        <div class="container">
                                        <a href="/"> <span class=""> <h4 class="logotext">TOLLKEEP</h4>       </span></a>

                                        <span class=""> 
                                                <span class="href showprofile ">  
                                                <span class="account make_it_pointer  text-white h5">profile </span></span>
                                        </span>
                                        </div>
                                </nav>
                                <Suspended userdetail={props.userdetail} />


                        </>
                )
        }
}

const Navbar = (props) =>{
        return(


                <Nav userdetail={props.userdetail}/>
        )
}

export default Navbar
