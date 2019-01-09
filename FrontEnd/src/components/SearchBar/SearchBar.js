import React from 'react';
import TravelHistory from '../TripsBoard/TravelHistory'
import PlaceFinder from '../PlaceFinder/PlaceFinder'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css'
import {Redirect} from 'react-router-dom';
import Places from '../Places/Places';
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import * as Actions from '../../actions/place_finder.js'
import serializeForm from 'form-serialize'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Checkbox from 'muicss/lib/react/checkbox';
import ReactPaginate from 'react-paginate';
import { graphql, withApollo } from "react-apollo";
import { PropertySearchQuery } from "../../Queries/Queries"


var len0 = 0;
var len1 = 0;
var len2 = 0;


class SearchBar extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      placename: localStorage.getItem("CurrrentSearchCity"),
      startdate: localStorage.getItem("CurrrentSearchStartDate"),
      enddate: localStorage.getItem("CurrrentSearchEndDate"),
      adultlist: localStorage.getItem("CurrrentSearchAdults"),
      childlist: localStorage.getItem("CurrrentSearchChild"),
      placeslist: [],
      redirection: false,
      NoPlacestoShow : true,
      pricevalue : 0,
      bedroomsvalue : 0,
      bathroomsvalue : 0,
      oceanfrontchecked : false,
      oceanchecked : false,
      mountainschecked : false,
      villagechecked : false,
      beachviewchecked : false,
      villachecked : false,
      apartmentchecked : false,
      townhousechecked : false,
      bungalowchecked : false,
      housechecked : false,
      currentPage: 1,
      todosPerPage: 5
    };
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  handleClickPage(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  onSubmitSearch = (event) => { 

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
      this.setState({placeslist : response.data.search})
      if(this.state.placeslist.length == 0)
      {
        this.setState({errors : true})
      }
      else
      {
        this.setState({errors : false})
        this.setState({redirection : true})
        this.setState({NoPlacestoShow : false})
      }
    })

    localStorage.setItem("CurrrentSearchCity",this.state.placename)
    localStorage.setItem("CurrrentSearchStartDate",this.state.startdate)
    localStorage.setItem("CurrrentSearchEndDate",this.state.enddate)
    localStorage.setItem("CurrrentSearchAdults",this.state.adultlist)
    localStorage.setItem("CurrrentSearchChild",this.state.childlist)
  
  }

  componentDidMount() {
   
    
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
      this.setState({placeslist : response.data.search})
      if(this.state.placeslist.length == 0)
      {
        this.setState({errors : true})
      }
      else
      {
        this.setState({errors : false})
        this.setState({redirection : true})
        this.setState({NoPlacestoShow : false})
      }
      });


    
  }
  
  componentWillMount()
  {

  }

  onPlaceChange = (event) => {
    this.setState({placename : event.target.value})
  }

  onStartDateChange = (event) => {
    this.setState({startdate : event.target.value})
  }

  onEndDateChange = (event) => {
    this.setState({enddate : event.target.value})
  }

  onAdultListChange = (event) => {
    this.setState({adultlist : event.target.value})
  }

  onChildListChange = (event) => {
    this.setState({childlist : event.target.value})
  }

handleClick(key){
    console.log("KEY IS " +key);
    localStorage.setItem("activekey" , key)
   
}

handleChangePrice = value => {
  this.setState({
    pricevalue: value
  })
};

handleChangeBedRooms = value => {
  this.setState({
    bedroomsvalue: value
  })
};


handleChangeBathRooms = value => {
  this.setState({
    bathroomsvalue: value
  })
};


onChange(ev, parameter) {
  this.setState({parameter: ev.target.checked});
}
  render() {
   
    let redirecty_value = null;
    let NoPlaces = null;
    const { pricevalue, bedroomsvalue, bathroomsvalue } = this.state
    // if(cookie.load('cookie'))
    // {
      var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
      //   if(cookie.load('cookie')){
          if(USERTYPE==="traveler"){
     // {console.log("showinconsole = " + this.state.showinconsole)}
        if(this.state.redirection === true)
        {
          redirecty_value  = this.state.placeslist.map((trip, index) => {
            console.log(index, trip.Property)
              return (
                <Places
                  key={index}
                  id={trip.Property.prop_id}
                  name={trip.Property.name}
                  type={trip.Property.type}
                  location={trip.Property.location}
                  bed={trip.Property.bed}
                  bath={trip.Property.bath}
                  description={trip.Property.description}
                  startdate={trip.Property.startdate}
                  enddate={trip.Property.enddate}
                  clicked={this.handleClick}
                 value={trip.Property.prop_id}
                 rate={trip.Property.rate}
                 unit={trip.Property.unit}
                  />
              ); //return
            }) //map
      } //if

      if(this.state.NoPlacestoShow === true)
      {
          NoPlaces = (<p class="error"><h3> No Places to show! Please select a different criteria</h3></p> )
      }
    }
     else
      {
        redirecty_value = (<Redirect to="/login" />)
      }
    return (
        <div>
        <hr />
{/**/ }
         <div class="row centery">
                              <div class="info-form">
                                  <form onSubmit={this.onSubmitSearch} action="" class="form-inline justify-content-center">
                                      <div class="form-group">
                                          <input type="text" name="places" class="form-control form-control-lg roundy" value={this.state.placename} placeholder="" onChange= {this.onPlaceChange}/>
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                         <input type="date" name="startdate" class="form-control form-control-lg roundy"
                                         value={this.state.startdate}
                              onChange={this.onStartDateChange}
                                       />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                        <input type="date" name="enddate" class="form-control form-control-lg roundy"
                                        value = {this.state.enddate}
                              onChange={this.onEndDateChange}
                                           />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="text" name="adultlist" class="reduce form-control form-control-lg roundy smally" placeholder="" value={this.state.adultlist} onChange = {this.onAdultListChange} />
                                          <input type="text" name="childlist" class="reduce form-control form-control-lg roundy smally" placeholder="" value={this.state.childlist} onChange = {this.onChildListChange} />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <input type="submit" class="bluebutton btn btn-primary btn-lg roundy" value="Search" />
                                  </form>
                              </div>
                        <br />  
           </div>
           <br />
           <div class="movetocenter">
<button type="button"  data-toggle="modal" data-target="#exampleModal"  data-whatever="@getbootstrap"> <p class="boldy">More Filters</p></button>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">More Filters</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <p class="boldy"><h1>Price per night</h1></p>
          <div className='slider'>
          <Slider
            min={300}
            max={1000}
            value={pricevalue}
            onChange={this.handleChangePrice}
          />
          <div className='value'>{pricevalue}</div>
        </div>
        <p class="boldy"><h1>Bed rooms</h1></p>
          <div className='slider'>
          <Slider
            min={1}
            max={5}
            value={bedroomsvalue}
            onChange={this.handleChangeBedRooms}
          />
          <div className='value'>{bedroomsvalue}</div>
        </div>
        <p class="boldy"><h1>Bath rooms</h1></p>
          <div className='slider'>
          <Slider
            min={1}
            max={5}
            value={bathroomsvalue}
            onChange={this.handleChangeBathRooms}
          />
          <div className='value'>{bathroomsvalue}</div>
        </div>
        <p class="boldy"><h1>Property Type</h1></p>
        <Checkbox
        label="Villa"
        checked={this.state.villachecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Apartment"
        checked={this.state.apartmentchecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Town House"
        checked={this.state.townhousechecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Bungalow"
        checked={this.state.bungalowchecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="House"
        checked={this.state.housechecked}
        onChange={this.onChange.bind(this)}
         />
          <p class="boldy"><h1>Location</h1></p>
        <Checkbox
        label="Ocean Front"
        checked={this.state.oceanfrontchecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Beach View"
        checked={this.state.beachviewchecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Ocean"
        checked={this.state.oceanchecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Village"
        checked={this.state.villagechecked}
        onChange={this.onChange.bind(this)}
         />
          <Checkbox
        label="Mountains"
        checked={this.state.mountainschecked}
        onChange={this.onChange.bind(this)}
         />
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
        <button type="button" class="btn btn-primary" onClick={this.onSubmitMessage}>Send message</button>
      </div>
    </div>
    </div>
  </div>
       <div >
            <ul>
            {redirecty_value}
            </ul>   
       </div>
              <div class="centery errorcenter">
                  {NoPlaces} 
              </div> 
              <div class="centerofpage">
            {/* <ul id="pagenumbers">
              {renderPageNumbers}
            </ul> */}
            </div> 
        </div>
        );
  }
}
export default withApollo(SearchBar);
//export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


/*


*/