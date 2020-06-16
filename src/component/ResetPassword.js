import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import '../css/fundoo.css'
import { sendLink } from '../configuration/Configuration';


class ResetPassword extends Component {
  state = {
    email: "",
    emailText: "",
    emailError: false,
    validEmail: false
  }

  UpdateState = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
    // console.log("emailId==> ",this.state.email);
    // console.log("password==> ",this.state.password);  

    sendLink(this.state.email).then(res => {
      console.log("response", res.data.message);
      this.props.openSnackBar(res.data.message)
    }).catch(error => {
      console.log("error=>", error.response.data.message);
      this.props.openSnackBar(error.response.data.message)
      this.setState({ validEmail: true })
    })
  }

  validateEmailAddress = e => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/
    const char = e.target.value;
    if (!regexp3.test(char)) {
      this.setState({
        [e.target.name]: "",
        emailError: true,
        emailText: "Invalid Email Id"
      });
    } else {
      this.setState({ 
        emailError: false, 
        emailText: "",
        validEmail: false
       })
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Resest Password
                    </Typography>
          <div className="form" >
            <p>
              If you‘d like to reset your password, please enter your email here
              and a link to do so will be sent to the address you enter.
          </p>
          <div>
            { this.state.validEmail && (
            <p style={{color: "red" }}>Please enter registered email address</p>
            )}
          </div>
            <TextField
              error={this.state.emailError}
              helperText={this.state.emailText}
              onBlur={this.validateEmailAddress}
              variant="outlined"
              margin="normal"
              value={this.state.email}
              onChange={this.UpdateState}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              onClick={this.handleClick}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: "2%", marginTop: "5%"}}
            >
              { "Send Link" }
              </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Sign In"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
export default ResetPassword