import react from "react";
import {useHistory} from 'react-router-dom'

const Navbar = () =>{
    const history = useHistory()
    const logout = () =>{
        localStorage.removeItem("userid")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        history.push({
            pathname: '/',
            status:"signin_success",
        });
    }
    return(
        <>
            <nav class="navbar navbar-expand-md1 px-lg-3 px-3">
                <div class="container">
                    <a href="/"> <span class=""> <h4 class="logotext">TollAdmin</h4>       </span></a>
                    <span class=""> 
                        <span class="href showprofile ">  
                            <span onClick={logout} class="account make_it_pointer  text-white h5">logout </span>
                        </span>
                    </span>
                </div>
            </nav>
        </>
    )
}
export default Navbar