import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import '../css/fundoo.css'
import { verifyUser } from '../configuration/Configuration';

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        emailText: "",
        passwordText: "",
        emailError: false,
        showPassword: false
    }

    UpdateState = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick = () => {
        // console.log("emailId==> ",this.state.email);
        // console.log("password==> ",this.state.password);  

        verifyUser(this.state).then(res => {
            console.log("response", res.data.message);
            this.props.openSnackBar(res.data.message)
        }).catch(error => {
            console.log("error=>", error.response.data.message);
            this.props.openSnackBar(error.response.data.message)
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
            this.setState({ emailError: false, emailText: "" })
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                        Sign in
                    </Typography>
                    <div className="form" >
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
                        {/* <TextField
                            variant="outlined"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.UpdateState}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        /> */}
                        <FormControl
                            fullWidth
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.UpdateState}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="password"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={80}
                            />
                        </FormControl>
                        <FormControlLabel
                            style={{ marginRight: "65%", marginBottom: "3%" }}
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={this.handleClick}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: "2%" }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs >
                                <Link href="/resetpassword" variant="body2" style={{ marginRight: "35%" }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/singup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
export default SignIn