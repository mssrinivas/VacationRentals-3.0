import React from 'react';
import DatePicker from 'react-datepicker';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
//import DatePicker from 'material-ui/DatePicker'
import ActionHome from 'material-ui/svg-icons/action/home';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
//import NavBar from '../NavBar/NavBar';
import TravelHistory from '../TripsBoard/TravelHistory';
import {Redirect} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import './PlaceFinder.css'
import { DateTimePicker } from 'react-widgets'
import Navigation from '../Navigation/Navigation';
import BackgroundImage from 'react-background-image-loader';
import Image from './BackgroundPic.jpg'; // Import using relative path
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import * as Actions from '../../actions/place_finder.js'
import serializeForm from 'form-serialize'
import { graphql, withApollo } from "react-apollo";
import { PropertySearchQuery } from "../../Queries/Queries"


class PlaceFinder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        placename: '',
        startdate:"",
        enddate: "",
        adultlist: 0,
        childlist: 0,
        validInput : false,
        trips : [],
        changepage : false,
        errors : false
      }
    }
  
    onPlaceChange = (event) => {
      this.setState({placename: event.target.value})
    }
  
    onStartDateChange = (event) => {
      this.setState({startdate: event.target.value})
    }
  
  
    onEndDateChange = (event) => {
      this.setState({enddate: event.target.value})
    }
  
    onAdultListChange = (event) => {
      this.setState({adultlist: event.target.value})
    }
  
     onChildListChange = (event) => {
      this.setState({childlist: event.target.value})
    }
  
    componentWillMount(){
        console.log("this is" + this.state.name)
        console.log(this.props.value)
    }
  
    componentDidMount()
    {
    
    }
  
    onSubmit = (event) => {


        localStorage.setItem("CurrrentSearchCity",this.state.placename)
        localStorage.setItem("CurrrentSearchStartDate",this.state.startdate)
        localStorage.setItem("CurrrentSearchEndDate",this.state.enddate)
        localStorage.setItem("CurrrentSearchAdults",this.state.adultlist)
        localStorage.setItem("CurrrentSearchChild",this.state.childlist)

    event.preventDefault();
    this.props.client
    .query({
      query: PropertySearchQuery,
      variables: {
        placename: this.state.placename,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        adultlist: Number(this.state.adultlist),
        childlist: Number(this.state.childlist)
      }
    })
    .then(response => {

      console.log("property search", response.data.search);
      this.setState({trips : response.data.search})
      if(this.state.trips.length == 0)
      {
        this.setState({errors : true})
      }
      else
      {
        this.setState({errors : false})
        this.setState({redirection : true})
      }
      });
}

  render()
  {

     let Redirecty = null;
     let No_Place = null;

var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
      
    if(USERTYPE==="traveler"){
        if(this.state.errors === false && this.state.redirection === true)
        {
         Redirecty = <Redirect to="/home/places" />
        }
      }
      else
      {
        Redirecty = <Redirect to="/login" />
      }
      if(this.state.errors === true || this.state.noplaces === true)
      {
        No_Place = "No Places found, Please select a different Criteria"
        alert(No_Place)
      }

return (
     <div class="backgroundcontainer" >
     <img class="bg" src='https://greenvalleyranch.sclv.com/~/media/Images/Page-Background-Images/GVR/Hotel/GV_Hotel_Exterior4Pool-2012.jpg?h=630&la=en&w=1080'/>
 {Redirecty}

 <Navigation value={this.props.value} />
 <div class="centering row centered">
                         <div class="info-form">
                             <form action="" class="form-inline justify-content-center">
                                 <div class="form-group">
                                     <input type="text" class="form-control form-control-lg roundy" placeholder="City" onChange = {this.onPlaceChange}/>
                                 </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <div class="form-group">
                                     <input type="date" class="form-control form-control-lg roundy"
                         onChange={this.onStartDateChange}
                                  /> 
                                 </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <div class="form-group">
                                     <input type="date" class="form-control form-control-lg roundy"
                         onChange={this.onEndDateChange}
                                      />
                                 </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <div class="form-group">
                                     <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Adults" onChange = {this.onAdultListChange} />
                                     <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Children" onChange = {this.onChildListChange} />
                                 </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <button type="button" class="bluebutton btn btn-primary btn-lg roundy" onClick = {this.onSubmit}>Search</button>
                             </form>
                         </div>
                   <br />  
      </div>
</div>

    )
  }
}
export default  withApollo(PlaceFinder); 