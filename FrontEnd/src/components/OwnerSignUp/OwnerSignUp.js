import React from 'react';
import './OwnerSignUp.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

import {connect} from 'react-redux'
import * as Actions from '../../actions/login_signup.js'
import serializeForm from 'form-serialize'

import jwtDecode from 'jwt-decode'

const mapStateToProps = (state) => {
  console.log("here",state)
 return {
  /*FirstName : state.FirstName,
  LastName : state.LastName,
  PrimaryEmail : state.PrimaryEmail,
  Password : state.Password,
  Username : state.Username,
  Redirection_Value : state.Redirection_Value,
  errors : state.errors */
  loginSingup : state.LOGIN 
  }
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    onFirstNameChange : (event) => dispatch(Actions.setFirstnameField(event.target.value)),
    onLastNameChange : (event) => dispatch(Actions.setLastnameField(event.target.value)),
    onPrimaryEmailChange : (event) => {dispatch(Actions.setMailField(event.target.value))},
    onUsernameChange : (event) => {dispatch(Actions.setSignUpUsernameField(event.target.value))},
    onPasswordChange : (event) => {dispatch(Actions.setSignUpPasswordField(event.target.value))},
    onSubmitSignInFalse : () => {dispatch(Actions.setErrorsasTrue(true))},
    onSubmitSignInTrue : () =>  {dispatch(Actions.setRedirectionasTrue(true))}
        }
}*/

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitSignInFalse : () => {dispatch(Actions.setErrorsasTrue(true))},
    onSubmitSignInTrue : () =>  {dispatch(Actions.setRedirectionasTrue(true))},
    onSubmitLog : (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    var UserSignUp = { FirstName: values.firstname, LastName : values.lastname, PrimaryEmail : values.email, Password : values.password, Username : values.username }
    console.log("JSON for SignUp "+ JSON.stringify(UserSignUp))
    dispatch(Actions.SignUp(UserSignUp))
    }
  }
}


class OwnerSignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      check_values : false
    }
  }

  onSubmitSignUp = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    var check_firstname = values.firstname
    var check_lastname= values.lastname
    var check_username = values.username
    var check_mail = values.email

    console.log("VALUES ARE", check_firstname, check_lastname, check_username, check_mail)

    var Exp = /^[a-zA-Z]+$/;
    if (
      check_mail == null ||
      check_mail == "" ||
      check_firstname == null ||
      check_firstname == "" ||
      check_lastname == null ||
      check_lastname == "" ||
      check_username == null ||
      check_username == ""
    ) {
           this.setState({check_values:true})
    }
    if (
      !check_firstname.match(Exp) ||
      !check_lastname.match(Exp)
    ) {
      this.setState({check_values:true})
    } else {
       console.log("CORRECT")
    }
    if (
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(
        check_mail
      )
    ) {
      console.log("valid email");
    } else {
      this.setState({check_values:true})
    }
    if (
      check_mail !== null &&
      check_mail !== "" &&
      check_firstname !== null &&
      check_firstname!== "" &&
      check_lastname !== null &&
      check_lastname !== "" &&
      check_firstname.match(Exp) &&
      check_lastname.match(Exp) &&
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(check_mail))
      {
        this.setState({check_values:false})
      }


  const request = async () => {
    await this.props.onSubmitLog(event)
  //  await fetch('http://localhost:4004/owner/signup', {
    await fetch('http://13.52.55.245:4004/owner/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials : 'include',
      body: JSON.stringify({
        firstname: this.props.loginSingup.FirstName,
        lastname: this.props.loginSingup.LastName,
        username: this.props.loginSingup.Username,
        password: this.props.loginSingup.Password,
        email : this.props.loginSingup.PrimaryEmail
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          //this.setState({errors : true})
          this.props.onSubmitSignInFalse()
        }
        else
        {
          console.log("This is called as True")
          response.json()
          .then(user => {
              var decoded = jwtDecode(user);
              var accounttype = decoded.user.type;
              var userone = decoded.user._id;
              console.log("ACC - " + accounttype)
              console.log("USER", userone)
              localStorage.setItem("ACCOUNTTYPE", accounttype);
            //  localStorage.setItem("userId", username);
            //   response.json()
            //    .then(user => {
                console.log("NAME - " + userone)
                this.props.loadUser(userone);
                this.props.onSubmitSignInTrue()
              //  })
          })
        }
      })
    }
    request();
}

  render()
  {
    let Redirecty = null;
    let Errors = null;
    var USERTYPE = localStorage.getItem("ACCOUNTTYPE")

    if(this.props.loginSingup.Redirection_Value === true &&  USERTYPE==="owner")
    {
     Redirecty =  <Redirect to="/owner/home" />
    }
      if(this.props.loginSingup.errors === true || this.state.check_values === true)
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
                  <form onSubmit={this.onSubmitSignUp} >
                  <input type="text" name="firstname" class="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="First Name"  onChange={this.props.onFirstNameChange} required/>
                  <br>
                  </br>
                  <input type="text" name="lastname" class="form-control" id="exampleInputSecondName" aria-describedby="emailHelp" placeholder="Last Name"  onChange={this.props.onLastNameChange} required/>
                  <br>
                  </br>
                  <input type="email" name = "email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Primary email"  onChange={this.props.onPrimaryEmailChange} required/>
                  <br>
                  </br>
                  <input type="text" name = "username"  class="form-control" id="exampleInputusername" placeholder="Username"  onChange={this.props.onUsernameChange} required/>
                   <br>
                  </br>
                  <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.props.onPasswordChange} required/>
                   <br>
                  </br>
                  <div className="text-center mb-3">
                    <input type="submit" gradient="blue" className="btn btn-primary btn-lg btn-block" value="Sign Up" />
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignUp);
/*
  constructor(props) {
    super(props);
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:4004/owner/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials : 'include',
      body: JSON.stringify({
        firstname: this.props.FirstName,
        lastname: this.props.LastName,
        username: this.props.Username,
        password: this.props.signInPassword,
        email : this.props.PrimaryEmail
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          //this.setState({errors : true})
          this.props.onSubmitSignInFalse()
        }
      else
        {
          response.json()
          .then(user => {
          console.log("NAME" + user)
          this.props.loadUser(user);
          this.props.onSubmitSignInTrue()
          })
        }
      })
  }

  render()
  {
    let Redirecty = null;
    let Errors = null;
    if(this.props.Redirection_Value === true)
    {
     Redirecty =  <Redirect to="/home" />
    }
    if(this.props.errors === true)
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
                  <input type="text" class="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="First Name"  onChange={this.props.onFirstNameChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputSecondName" aria-describedby="emailHelp" placeholder="Last Name"  onChange={this.props.onLastNameChange} required/>
                  <br>
                  </br>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Primary email"  onChange={this.props.onPrimaryEmailChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputusername" placeholder="Username"  onChange={this.props.onUsernameChange} required/>
                   <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.props.onPasswordChange} required/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignUp);
*/