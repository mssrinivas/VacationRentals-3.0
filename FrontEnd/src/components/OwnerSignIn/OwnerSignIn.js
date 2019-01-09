import React from 'react';
import './OwnerSignIn.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import * as Actions from '../../actions/login_signup.js'
import serializeForm from 'form-serialize'



import { OwnerLoginQuery } from "../../Queries/Queries";
import { graphql, withApollo } from "react-apollo";



import jwtDecode from 'jwt-decode'

const mapStateToProps = (state) => {
  console.log("here",state)
 return {
   /*signInEmail : state.loginSingup.signInEmail,
   signInPassword : state.signInPassword,
   errors : state.errors,
   Redirection_Value : state.Redirection_Value*/
   loginSingup : state.LOGIN
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitSignInFalse : () => {dispatch(Actions.setErrorsasTrue(true))},
    onSubmitSignInTrue : () =>  {dispatch(Actions.setRedirectionasTrue(true))},
    onSubmitLog : (event) => {
      event.preventDefault();
      const values = serializeForm(event.target, { hash: true })
      console.log(values)
     var UserSignIn = { signInEmail: values.mailid , signInPassword : values.password}
     console.log("OBJECT IS " + JSON.stringify(UserSignIn))
     dispatch(Actions.SignIn(UserSignIn))
    }
    }
}


class OwnerSignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      Redirection_Value : false,
      signInEmail : "",
      signInPassword: ""
    }
  }


 CHANGEEMAIL = (event) => {
  this.setState({signInEmail : event.target.value})
  }
  
  CHANGEPASSWORD = (event) => {
    this.setState({signInPassword : event.target.value})
  }

 onSubmitSignIn = (event) => { 

  event.preventDefault();
  console.log("USERNAME ", this.state.signInEmail)
  this.props.client
    .query({
      query: OwnerLoginQuery,
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
        console.log("resp", response.data);
        var user = response.data.OwnerLogin.username;
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
         console.log("HEEREE")
        const { handleSubmit } = this.props;
        var USERTYPE = localStorage.getItem("ACCOUNTTYPE")

      if(this.state.Redirection_Value === true &&  USERTYPE==="owner")
       {
        Redirecty =  <Redirect to="/owner/home" />
       }
       if(this.state.errors === true)
       {
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
        <p className="font-small grey-text d-flex justify-content-center">Not a member? <a href="/owner/signup" className="blue-text ml-1"> Sign Up</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Account Login</h3>
                    <hr></hr>
                  </div>
                 <form onSubmit={this.onSubmitSignIn} > {/*{handleSubmit(this.onSubmit.bind(this))*/}
                  <input type="text" name="mailid" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.CHANGEEMAIL} required/>
                  <br>
                  </br>
                  <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.CHANGEPASSWORD} required/>
                   <br>
                  </br>
                  <p className="blue-text d-flex pb-3">Forgot <a href="www.google.com" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <input type="submit" gradient="blue" className="btn btn-primary btn-lg btn-block" value="Log In"/>
                      <hr></hr>
                  </div>
                  </form>
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

export default withApollo(OwnerSignIn);
