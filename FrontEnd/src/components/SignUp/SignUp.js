import React from 'react';
import './SignUp.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import serializeForm from 'form-serialize'
import jwtDecode from 'jwt-decode'
import { loginQuery } from "../../Queries/Queries";
import { MutationSignUp } from "../../Mutations/Mutations";
import { graphql, withApollo } from "react-apollo";


class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName : '',
      LastName : '',
      PrimaryEmail : '',
      signInPassword: '',
      Username : '',
      Redirection_Value : false,
      errors : false
    }
  }

  onFirstNameChange = (event) => {
    this.setState({FirstName: event.target.value})
  }

  onLastNameChange = (event) => {
    this.setState({LastName: event.target.value})
  }

  onPrimaryEmailChange = (event) => {
    this.setState({PrimaryEmail: event.target.value})
  }

   onUsernameChange  = (event) => {
    this.setState({Username: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    this.props.MutationSignUp({
          variables: {
            email: this.state.PrimaryEmail,
            firstname: this.state.FirstName,
            lastname: this.state.LastName,
            password: this.state.signInPassword,
            username : this.state.Username
          }
        })
    .then(response => {
      if(response.status === 400)
        {
          this.setState({errors : true})
        }
      else
        {
          console.log("This is called as True")
                    console.log("resp", response.data.signup.username);
                    var user = response.data.signup.username;
                    var decoded = jwtDecode(user);
                    var accounttype = decoded.user.type;
                    var userone = decoded.user._id;
                    console.log("ACC - " + accounttype)
                    console.log("USER", userone)
                    localStorage.setItem("ACCOUNTTYPE", accounttype);
                    this.props.loadUser(userone);
                    this.setState({Redirection_Value : true})
        }
      })
  }

  render()
  {
    let Redirecty = null;
    let Errors = null;
    var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
    if(this.state.Redirection_Value === true && USERTYPE==="traveler")
    {
     Redirecty =  <Redirect to="/home" />
    }
      if(this.state.errors === true)
    {
      Errors = <p class="error"> Error Signing Up </p>
    }
    return(
      <div>
      {Redirecty}
       <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <a class="navbar-brand" href="#"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://static.savings-united.com/shop/20251/logo/Logo_0062_HomeAway.png" height="150" width="150"/></a>
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">
                <li>
                <a class="site-header-birdhouse" href="/" title="Learn more"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://lh3.googleusercontent.com/peTB5wWV332_otZJMJ897LqTv2B40lity4VDuStgZ4U8ocCGKUBGisnjSi9TyhXSOydm=s180" height="50" width="50"/></a>          
                </li>
            </ul>
    </nav>
    <br />
    <hr />
      <Container>
       <h1> Sign Up to HomeAway </h1>
        <p className="font-small grey-text d-flex justify-content-center">Already have an account? <a href="/login" className="blue-text ml-1"> Login</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Account SignUp</h3>
                    <hr></hr>
                  </div>
                  <input type="text" class="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="First Name"  onChange={this.onFirstNameChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputSecondName" aria-describedby="emailHelp" placeholder="Last Name"  onChange={this.onLastNameChange} required/>
                  <br>
                  </br>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Primary email"  onChange={this.onPrimaryEmailChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputusername" placeholder="Username"  onChange={this.onUsernameChange} required/>
                   <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onPasswordChange} required/>
                   <br>
                  </br>
                  <div className="text-center mb-3">
                    <Button type="button" gradient="blue" className="btn btn-primary btn-lg btn-block" onClick = {this.onSubmitSignIn}>Sign Up</Button>
                      <hr></hr>
                  </div>
                </CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
         {Errors}
      </Container>
      </div>
      );
  }
}

//export default  withApollo();
export default graphql(MutationSignUp, { name: "MutationSignUp" })(SignUp);