import React from 'react';
import TravelHistory from './TravelHistory.js'
import NavBar from '../NavBar/NavBar';
import Navigation from '../Navigation/Navigation';
import './tripsboard.css'
import SearchBar from '../SearchBar/SearchBar';
import cookie from 'react-cookies';
import {Redirect} from  'react-router';
import {connect} from 'react-redux'
import * as Actions from '../../actions/place_finder.js'
import TripsBoardPlaces from './TripsBoardPlaces';


import { graphql, withApollo } from "react-apollo";
import { TripsBoardQuery } from "../../Queries/Queries"


const mapStateToProps = (state) => {
  console.log("here",state)
 return {
  SearchPlaces : state.PLACES
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrips : (places) => dispatch(Actions.updateLatestTrips(places)),
    noPlacesToShow : (value) => dispatch(Actions.setNoPlacestoShow(value))
        }
}

var len2 = 0;

class TripsBoard extends React.Component {
 constructor(props) {
    super(props);
   this.state = {
     latesttrips: [],
      NoPlacestoShow : true
  }
  }



  componentDidMount() {

      this.props.client.query({
      query: TripsBoardQuery,
      variables: {
      username: localStorage.getItem("usernamey")
      }
      })
      .then(response =>  {
      console.log("Tripboards", response.data.TripsBoardQuery);
      this.setState({
        latesttrips: response.data.TripsBoardQuery
      });

      if(this.state.latesttrips.length >0)
      {
        this.setState({NoPlacestoShow : false})
      }
      });
  }
  render() {
    let NoPlaces = null;
    let Redirect_to_Home = null;
    let redirecty_value = null;

   
      var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
      //   if(cookie.load('cookie')){
          if(USERTYPE==="traveler")
          {
     if(this.state.NoPlacestoShow === true)
      {
          NoPlaces = (<p class="blueerror errorcenter"><h3>You currently do not have any bookings! Try out our service</h3></p> )
      }
      else
      {
    
        redirecty_value  = this.state.latesttrips.map((trip, index) => {  console.log(index, trip.Property)
          return (
            <TripsBoardPlaces
              key={index}
              id={trip.Bookings.Property.prop_id}
              name={trip.Bookings.Property.name}
              type={trip.Bookings.Property.type}
              location={trip.Bookings.Property.location}
              bed={trip.Bookings.Property.bed}
              bath={trip.Bookings.Property.bath}
              description={trip.Bookings.Property.description}
              startdate={trip.Bookings.Property.startdate}
              enddate={trip.Bookings.Property.enddate}
              clicked={this.handleClick}
             value={trip.Bookings.Property.id}
             rate={trip.Bookings.Property.rate}
             unit={trip.Bookings.Property.unit}
              />
          ); //return
        }) //map
      }
    }
    else
    {
        Redirect_to_Home = (<Redirect to="/login" />)
    }
    return (
        <div>
        {Redirect_to_Home}
        <br />
         <hr />
         <div class="headingtrips">
            <h1> Trip Boards </h1>
            <h4> Trip Boards help you keep track of the places you love.</h4> 
        </div>
        {NoPlaces}
        <div >
            <ul>
            {redirecty_value}
            </ul>
       </div>
       <div class="centerofpage">
        
            </div> 
         </div>
        );

  }
}

export default withApollo(TripsBoard);
//export default connect(mapStateToProps, mapDispatchToProps)(TripsBoard);