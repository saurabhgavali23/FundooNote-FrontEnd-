import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Copyright from './Copyright';
import '../css/fundoo.css'
import { changePassword } from '../configuration/Configuration';

export class ConfirmPassword extends Component {

    state = {
        newPassword: "",
        newPasswordText: "",
        errorNewPassword: false,
        confirmPassword: "",
        confirmPasswordText: "",
        errorConfirmPassword: false,
        userToken: "",
        showPassword: false
    }

    handleClick = () => {

        changePassword(this.state)
            .then(res => {
                this.goToSuccessPage(res.data.message);
            }).catch(error => {
                console.log(error);
            })
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    goToSuccessPage(userMessage) {
        this.props.history.push({
            pathname: "/successpage",
            state: userMessage
        })
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        this.setState({ userToken: token })
    }

    UpdateState = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    passwordValidation = e => {
        const regex2 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        const char = e.target.value;

        if (!regex2.test(char)) {
            this.setState({
                [e.target.name]: "",
                errorNewPassword: true,
                newPasswordText: "Invalid Password"
            })
        } else {
            this.setState({ errorNewPassword: false, newPasswordText: "" })
        }
    }

    confirmPasswordValidation = e => {
        if (!this.state.newPassword.match([e.target.value])) {
            this.setState({
                [e.target.name]: "",
                errorConfirmPassword: true,
                confirmPasswordText: "Password Mismatch"
            })
        } else {
            this.setState({ errorConfirmPassword: false, confirmPasswordText: "" })
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
                        Change Password
                    </Typography>
                    <div className="form" >
                        {/* <TextField
              error={this.state.errorNewPassword}
              helperText={this.state.newPasswordText}
              onBlur={this.passwordValidation}
              variant="outlined"
              margin="normal"
              value={this.state.newPassword}
              onChange={this.UpdateState}
              required
              fullWidth
              id="newpassword"
              label="New Password"
              name="newPassword"
              type="password"
              autoComplete="newPassword"
              autoFocus
            /> */}
                        <FormControl
                            style={{ marginTop: "3%" }}
                            fullWidth
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="newPassword">
                               New Password
                            </InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                name="newPassword"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.newPassword}
                                onChange={this.UpdateState}
                                error={this.state.errorNewPassword}
                                helpertext={this.state.newPasswordText}
                                onBlur={this.passwordValidation}
                                autoComplete="newPassword"
                                autoFocus
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="newPassword"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={120}
                            />
                        </FormControl>
                        <TextField
                            error={this.state.errorConfirmPassword}
                            helperText={this.state.confirmPasswordText}
                            onBlur={this.confirmPasswordValidation}
                            variant="outlined"
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.UpdateState}
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            //type="password"
                            type={this.state.showPassword ? "text" : "password"}
                            autoComplete="confirmPassword"
                        />
                        {/* <FormControl
                            style={{ marginTop: "3%" }}
                            fullWidth
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="ConfirmPassword">
                               Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.confirmPassword}
                                onChange={this.UpdateState}
                                error={this.state.errorConfirmPassword}
                                helpertext={this.state.confirmPasswordText}
                                onBlur={this.confirmPasswordValidation}
                                autoComplete="confirmPassword"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="confirmPassword"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={140}
                            />
                        </FormControl> */}
                        <Button
                            onClick={this.handleClick}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: "2%", marginTop: "5%" }}
                        >
                            {"Submit"}
                        </Button>
                    </div>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        )
    }
}

export default ConfirmPassword
