import React,{Component} from 'react';
import './TravelerAccount.css';
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'
import * as Actions from '../../actions/traveler_profile.js'
import serializeForm from 'form-serialize'
import { graphql, withApollo } from "react-apollo";
import {AccountDetailsQuery} from '../../Queries/Queries';
import {MutationAccountDetails} from '../../Mutations/Mutations';
 
class TravelerAccount extends Component {

	 constructor(props) {
	    super(props);
	    this.state = {
        FirstName: "",
	      LastName: "",
	      PrimaryEmail: "",
        Contact: "",
        Gender: "",
        AboutMe: "",
        Languages: "",
        SchoolName: "",
	      CompanyName: "",
	      StreetAddress: "",
	      City : "",
	      State : "",
	      Country: ""
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

 	onCompanyNameChange = (event) => {
 		this.setState({CompanyName: event.target.value})
 	}

  onSchoolNameChange = (event) => {
    this.setState({SchoolName: event.target.value})
  }

    onCountryChange = (event) => {
    this.setState({Country: event.target.value})
  }

  onStreetAddressChange = (event) => {
    this.setState({StreetAddress: event.target.value})
  }

  onCityChange = (event) => {
    this.setState({City: event.target.value})
  }
    onStateChange = (event) => {
    this.setState({State: event.target.value})
  }
   
   onGenderChange = (event) => {
    this.setState({Gender: event.target.value})
  }

  onLanguageChange = (event) => {
    this.setState({Languages: event.target.value})
  }

  onContactChange = (event) => {
    this.setState({Contact: event.target.value})
  }

  onAboutMeChange = (event) => {
    this.setState({AboutMe: event.target.value})
  }

  onSubmitUpdate = (event) => {
    event.preventDefault();
 


  this.props.client
  .mutate({
    mutation: MutationAccountDetails,
    variables: {
      firstname: this.state.FirstName,
            lastname: this.state.LastName,
            aboutme: this.state.AboutMe,
            company: this.state.CompanyName,
            school: this.state.SchoolName,
            hometown: this.state.City,
            language : this.state.Languages,
            gender: this.state.Gender, 
            state: this.state.State,
            country: this.state.Country,
            contact: this.state.Contact,
            address: this.state.StreetAddress,
            username: String(localStorage.getItem("usernamey"))
     
    }
  })
  .then(response => {
    console.log("book property response", response);
    window.alert(response.data.AccountDetailsEdit.status);
  });

  
  }

    componentDidMount() {
      this.props.client
      .query({
        query: AccountDetailsQuery,
        variables: {
          username: localStorage.getItem("usernamey") 
        }
      })
      .then(response => {
        console.log(
          "selected property search",
          response.data.AccountDetailsQuery
        );
              if( response.data.AccountDetailsQuery.firstname !== null &&  response.data.AccountDetailsQuery.firstname !== undefined)
      this.setState({FirstName:  response.data.AccountDetailsQuery.firstname})
      if(  response.data.AccountDetailsQuery.lastname!== null &&  response.data.AccountDetailsQuery.lastname!== undefined)
      this.setState({LastName:  response.data.AccountDetailsQuery.lastname})
      if( response.data.AccountDetailsQuery.email !== null &&  response.data.AccountDetailsQuery.email !== undefined)
      this.setState({PrimaryEmail:  response.data.AccountDetailsQuery.email})
      if( response.data.AccountDetailsQuery.aboutme !== null &&  response.data.AccountDetailsQuery.aboutme !== undefined)
      this.setState({AboutMe :  response.data.AccountDetailsQuery.aboutme})
      if( response.data.AccountDetailsQuery.company !== null &&  response.data.AccountDetailsQuery.company !== undefined)
      this.setState({CompanyName:  response.data.AccountDetailsQuery.company})
      if( response.data.AccountDetailsQuery.school !== null &&  response.data.AccountDetailsQuery.school !== undefined)
      this.setState({SchoolName:  response.data.AccountDetailsQuery.school})
      if( response.data.AccountDetailsQuery.address!== null &&  response.data.AccountDetailsQuery.address!== undefined)
      this.setState({StreetAddress:  response.data.AccountDetailsQuery.address})
      if( response.data.AccountDetailsQuery.country !== null &&  response.data.AccountDetailsQuery.country !== undefined)
      this.setState({Country:  response.data.AccountDetailsQuery.country})
      if( response.data.AccountDetailsQuery.hometown !== null &&  response.data.AccountDetailsQuery.hometown !== undefined)
      this.setState({City:  response.data.AccountDetailsQuery.hometown})
      if( response.data.AccountDetailsQuery.state !== null &&  response.data.AccountDetailsQuery.state !== undefined)
      this.setState({State:  response.data.AccountDetailsQuery.state})
      if( response.data.AccountDetailsQuery.gender !== null &&  response.data.AccountDetailsQuery.gender !== undefined)
      this.setState({Gender:  response.data.AccountDetailsQuery.gender})
      if( response.data.AccountDetailsQuery.language !== null &&  response.data.AccountDetailsQuery.language !== undefined)
      this.setState({Languages:  response.data.AccountDetailsQuery.language})
      if( response.data.AccountDetailsQuery.contact!== null &&  response.data.AccountDetailsQuery.contact!== undefined)
      this.setState({Contact:  response.data.AccountDetailsQuery.contact})

      })
    

  }


	render ()
	{
		return (
  <div class="accountinfo">
<div class="container shadowingcontainertraveller">
  <h1 class="page-header">Profile information</h1>
  <div class="row">
    <div class="col-md-12 col-sm-6 col-xs-12">
      <div class="text-center">
        <img src="https://media.licdn.com/dms/image/C5103AQHzkRC2Vk8gwg/profile-displayphoto-shrink_200_200/0?e=1542844800&v=beta&t=e_vwRp7Hpmpt_BXdrZZI2lwXdWYx1KU1ROyOx8B52CE" class="avatar img-circle img-thumbnail" alt="avatar" />
        <h6>Upload a different photo...</h6>
        <input type="file" class="text-center center-block well well-sm" />
      </div>
    </div>
    </div>
      <div class="col-md-12 col-sm-8 col-xs-12 forum">
          <h4 class="mb-3"></h4>
          <section className="form-elegant" >
          <form onSubmit={this.onSubmitUpdate} class="needs-validation" novalidate="">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" class="form-control form-control-lg" name="firstname" placeholder="" value={this.state.FirstName} required="" disabled onChange={this.onFirstNameChange}/>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control form-control-lg" name="lastname" placeholder="" value={this.state.LastName} required="" disabled onChange={this.onLastNameChange}/>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="email">Email <span class="text-muted"></span></label>
              <input type="email" class="form-control form-control-lg" name="email" placeholder="you@example.com" value={this.state.PrimaryEmail}  disabled onChange={this.onPrimaryEmailChange}/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div class="mb-3">
              <label for="address">About me</label>
              <textarea type="textarea" class="form-control form-control-lg" name="aboutme" placeholder=""  value={this.state.AboutMe} onChange={this.onAboutMeChange} required="" />
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="mb-3">
              <label for="address2">Company <span class="text-muted"></span></label>
              <input type="text" class="form-control form-control-lg" name="company" placeholder=""  value={this.state.CompanyName} onChange={this.onCompanyNameChange}/>
            </div>

            <div class="mb-3">
              <label for="address2">School <span class="text-muted"></span></label>
              <input type="text" class="form-control form-control-lg" name="school" placeholder=""  value={this.state.SchoolName} onChange={this.onSchoolNameChange}/>
            </div>


            <div class="mb-3">
              <label for="address2">Address <span class="text-muted">(Optional)</span></label>
              <input type="text" class="form-control form-control-lg" name="street" placeholder="" value={this.state.StreetAddress} onChange={this.onStreetAddressChange}/>
            </div>
            <div class="row">
               <div class="col-md-3 mb-3">
                <label for="zip">Hometown</label>
                <input type="text" class="form-control form-control-lg" name="city" placeholder="" required="" value={this.state.City} onChange={this.onCityChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
                <div class="col-md-3 mb-3">
                <label for="zip">Language</label>
                <input type="text" class="form-control form-control-lg" name="language" placeholder="" required="" value={this.state.Languages} onChange={this.onLanguageChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div> 
            
              <div class="col-md-3 mb-3">
                <label for="zip">Gender</label>
                <input type="text" class="form-control form-control-lg" name="gender" placeholder="" required="" value={this.state.Gender} onChange={this.onGenderChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <div class="row">
             <div class="col-md-3 mb-3">
                <label for="zip">Country</label>
                <input type="text" class="form-control form-control-lg" name="country"  onChange={this.onCountryChange} value={this.state.Country} placeholder="" required="" />
                <div class="invalid-feedback">
                  Enter correct value
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">State</label>
                <input type="text" class="form-control form-control-lg" name="state"  onChange={this.onStateChange} value={this.state.State} placeholder="" required="" />
                <div class="invalid-feedback">
                  Enter correct value
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">Contact</label>
                <input type="text" class="form-control form-control-lg" name="contact" onChange={this.onContactChange} value={this.state.Contact} placeholder="" required="" />
                <div class="invalid-feedback">
                  Contact required.
                </div>
              </div>
            </div>
            <input type="submit" class="bluebutton btn btn-lg btn-block whitefont"  type="submit" value="Save Changes"/>
          </form>
          </section>
      </div>
      </div>  
      </div>
		);
	}
}

export default withApollo(TravelerAccount);
//export default connect(mapStateToProps, mapDispatchToProps)(TravelerAccount);