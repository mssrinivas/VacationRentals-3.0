import React from 'react';
import OwnerNavBar from '../OwnerNavBar/OwnerNavBar';
import OwnerSideBar from '../OwnerSideBar/OwnerSideBar';
import OwnerProperty from '../OwnerProperty/OwnerProperty';
import './OwnerDashBoard.css'
import OwnerNavigation from '../OwnerNavigation/OwnerNavigation';
import NavDropDown from '../OwnerNavigation/NavDropDown'
import {Redirect} from 'react-router'
import cookie from 'react-cookies'
import OwnerPropertyPlaces from '../OwnerPropertyPlaces/OwnerPropertyPlaces'





import { graphql, withApollo } from "react-apollo";
import { LatestPostingsQuery } from "../../Queries/Queries"


class OwnerDashBoard extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      property: [],
      propertylocation : [],
      redirect : false,
      currentPage: 1,
      todosPerPage: 2
    }
      this.handleClickPage = this.handleClickPage.bind(this);
    }
  
    handleClickPage(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }


  componentDidMount() {
    var result = []
  this.props.client.query({
    query: LatestPostingsQuery,
    variables: {
    username: localStorage.getItem("usernamey")
    }
    })
    .then(response =>  {
    console.log("Tripboards", response.data.LatestPostingsQuery);
    this.setState({
      property: response.data.LatestPostingsQuery
    });

    if(this.state.property.length >0)
    {
      this.setState({NoPlacestoShow : false})
    }
    });





  }
  render() {
    let redirect = null;
    var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
    if(USERTYPE!="owner")
    {
      redirect = (<Redirect to="/owner/login" />)
    }

        let redirecty_value = null;
        redirecty_value  = (
          <div class="middle">
           <table class="tabledef">
           <tbody>
           {
             this.state.property.map((trip, index) => {
                 return (
                  <OwnerPropertyPlaces
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
                 rate={trip.Property.rate}
                 unit={trip.Property.unit}
               />
                 );
               })
             }
             </tbody>
             </table>
           </div>
         );

    return (
      <div>
      {redirect}
      <div>
      <OwnerNavigation properties={this.state.propertylocation}  />
      </div>
      <br />
      <hr />
      <div>
      </div>
      <div id="bodydiv" >
      {/*<OwnerProperty properties={this.state.property}/>*/}
      {redirecty_value}
      </div>
      <div class="centerofpage">
            </div> 
      </div>
    );
  }
}

export default withApollo(OwnerDashBoard);