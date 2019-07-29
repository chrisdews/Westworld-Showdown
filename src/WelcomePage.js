import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
//import { NavLink} from "react-router-dom";


class WelcomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showLogIn: false }
  }

  toggleButton = () => {
    this.setState({
      showLogIn: !this.state.showLogIn
    })
  }

  render() {
    console.log("The Welcome Page has rendered") 
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>Welcome to Westworld Showdown!</h1>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo2.png' />  */}
            {this.state.showLogIn ? "Log-in to your account" : "Welcome! Sign up below:"}
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user'
                iconPosition='left'
                placeholder='User Name'
                name='username'
                onChange={this.props.handleFormChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                name='password'
                onChange={this.props.handleFormChange}
                type='password'
              />
          
              <Button
                color='teal'
                fluid size='large'
                onClick={() => this.props.createUserOrSignIn(this.state.showLogIn)}
              >
                {this.state.showLogIn ? " Login" : " Sign Up"}
              </Button>
            </Segment>
          </Form>
          <Message>
            {this.state.showLogIn ? "New to us? " : "Already Regstered? "}<Button
              onClick={this.toggleButton}
            >{this.state.showLogIn ? "Go To Sign Up" : "Go To Login"}</Button>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default WelcomePage;