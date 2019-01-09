
import React from 'react';
import './SignIn.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import {connect} from 'react-redux'
import * as Actions from '../../actions/login_signup.js'
import serializeForm from 'form-serialize'
import jwtDecode from 'jwt-decode'

import { TravelerLoginQuery } from "../../Queries/Queries";
import { loginMutation } from "../../Mutations/Mutations";
import { graphql, withApollo } from "react-apollo";


class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state={
  signInEmail : "",
  signInPassword : "",
  errors : null,
  Redirection_Value : false
    }
  }

  onSubmitSignIn = (event) => { 
    event.preventDefault();
    console.log("USERNAME ", this.state.signInEmail)
    this.props.client
      .query({
        query: TravelerLoginQuery,
        variables: {
      username: this.state.signInEmail,
      password: this.state.signInPassword
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
          console.log("resp", response.data.login.username);
          var user = response.data.login.username;
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
CHANGEEMAIL = (event) => {
this.setState({signInEmail : event.target.value})
}

CHANGEPASSWORD = (event) => {
  this.setState({signInPassword : event.target.value})
}

  render()
  {
    let Redirecty = null;
    let Errors = null;
      console.log("HEEREE")
     var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
 //  if(this.props.loginSingup.Redirection_Value === true && cookie.load('cookie'))
 if(this.state.Redirection_Value === true && USERTYPE==="traveler")
    {
     Redirecty =  <Redirect to="/home" />
    }
    if(this.state.errors === true)
    {
      console.log("------here in pass check")
      Errors = <p class="error">Username or Password doesn't exist </p>
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
       <h1> Log in to HomeAway </h1>
        <p className="font-small grey-text d-flex justify-content-center">Not a member? <a href="/traveller/signup" className="blue-text ml-1"> Sign Up</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Account Login</h3>
                    <hr></hr>
                  </div>
                  <input type="text" name="mailid" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.CHANGEEMAIL} required/>
                  <br>
                  </br>
                  <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.CHANGEPASSWORD} required/>
                   <br>
                  </br>
                  <p className="blue-text d-flex pb-3">Forgot <a href="www.google.com" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <input type="submit" gradient="blue" className="btn btn-primary btn-lg btn-block" value="Log In" onClick={this.onSubmitSignIn}/>
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

export default withApollo(SignIn);

//export default connect(mapStateToProps, mapDispatchToProps)(SignIn);







