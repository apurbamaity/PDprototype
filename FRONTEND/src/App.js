import logo from './logo.svg';
import './App.css';

import {Route,Switch,Redirect} from 'react-router-dom';

import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Payment from './Components/Payment/Payment.jsx'
import Admin from './Components/Admin/Home.jsx'
import Autopay from './Components/Admin/Autopay.jsx'


function App() {
	return (
		<>
		  <Switch>

		      <Route exact path="/" component={Home} />
		      {/*<Route exact path="/team/:teamid" component={Insideteam} />*/}
		      {/*<Route exact path="/joinorcreate" component={Jointeam} />*/}
		      <Route exact path="/signin" component={Login} />
		      <Route exact path="/signup" component={Signup} />
		      <Route exact path="/payment" component={Payment} />
			  <Route exact path="/admin" component={Admin} />
			  <Route exact path="/autopay/:secretkey" component={Autopay} />

		  </Switch>
	  
		  {/*<About />
		  <Detail />*/}
	  
	  
		</>
	    );
}

export default App;
