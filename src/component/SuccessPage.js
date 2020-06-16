import React, { Component } from 'react'
import { Button, Container } from '@material-ui/core'

export class SuccessPage extends Component {

    state = {
        email: ""
    }

    gotoSingInPage = () =>{
       this.props.history.push({
           pathname: "/"
       })
    }
    
    render() {
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <h3>Congratulations! Your Account is Confirmed</h3>
                    <p>{this.props.location.state}</p>
                    <p>If You Want Sing In Click On SingIn Button</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.gotoSingInPage}
                    >
                        Sign In
                </Button>
                </Container>
            </div>
        )
    }
}

export default SuccessPage
