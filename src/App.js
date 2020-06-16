import React,{useState} from 'react';
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Styles from "./css/snackbar.module.css";
//import { RegstrationConfirmed } from './component/RegistrationConfirmed';
import ResetPassword from './component/ResetPassword';
import SuccessPage from './component/SuccessPage';
import ConfirmPassword from './component/ConfirmPassword';

function App() {

  const [state, setState] = useState({ isActive: false, status:'' })

  const openSnackBar = prop => {
  setState({ status: prop, isActive: true });
      setTimeout(() => {
        setState({status:'', isActive: false });
      }, 3000);
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={"/"} component={SignIn} exact>
          <SignIn openSnackBar={openSnackBar}/>
          </Route>
        <Route path={"/singup"} component={SignUp}>
          <SignUp openSnackBar={openSnackBar}/>
          </Route>
          <Route path={"/resetpassword"} component={ResetPassword}>
            <ResetPassword openSnackBar={openSnackBar}/>
          </Route>
          <Route path={"/successpage"} component={SuccessPage}/>
          <Route path={"/confirmpassword"} component={ConfirmPassword}/>
      </Switch>
      </BrowserRouter>
      <div
          className={
            state.isActive
              ? [Styles.snackbar, Styles.show].join(" ")
              : Styles.snackbar
          }
        >
          {state.status}
        </div>
    </div>
  );
}

export default App;
