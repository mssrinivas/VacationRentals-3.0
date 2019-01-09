import { gql } from "apollo-boost";


const TravelerLoginQuery = gql`
  query Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      username
    }
  }
`;



const OwnerLoginQuery = gql`
  query OwnerLogin($username: String, $password: String) {
    OwnerLogin(username: $username, password: $password) {
      username
    }
  }
`;



const PropertySearchQuery = gql`
  query search($placename: String, $startdate: String, $enddate: String, $adultlist: Int, $childlist: Int ) {
    search(placename: $placename, startdate: $startdate, enddate: $enddate, adultlist: $adultlist, childlist : $childlist) {    
    Property {
        prop_id
        name
        type
        bed
        bath
        startdate
        enddate
        currencytype
        rate
        minstay
        maxadults
        maxchild
        description
        unit
        city
        state
        zip
        country
        address
        location
        owner
    }
    }
  }
`;





const PropertyDetailsQuery = gql`
  query propertydetails($prop_id: Int) {
    propertydetails(prop_id: $prop_id) {
        prop_id
        name
        type
        bed
        bath
        startdate
        enddate
        currencytype
        rate
        minstay
        maxadults
        maxchild
        description
        unit
        city
        state
        zip
        country
        address
        location
        owner
        }
  }
`;



const AccountDetailsQuery = gql`
  query AccountDetailsQuery($username: String) {
    AccountDetailsQuery(username: $username) {
        
            firstname 
            lastname 
            school
            contact
            aboutme
            company
            hometown
            language
            gender
            traveler
            owner
            state
            country
            address
            username
            password
            email
        }
        
  }
`;

const TripsBoardQuery = gql`
query TripsBoardQuery($username: String) {
  TripsBoardQuery(username: $username) {
    Bookings {
      Property{
              prop_id
              name
              type
              bed
              bath
              startdate
              enddate
              currencytype
              rate
              minstay
              maxadults
              maxchild
              description
              unit
              city
              state
              zip
              country
              address
              location
              owner
             }
            booking_startdate
            booking_enddate
            booking_username
          }
    }
  }
`;


const LatestPostingsQuery = gql`
query LatestPostingsQuery($username: String) {
  LatestPostingsQuery(username: $username) {
      Property{
              prop_id
              name
              type
              bed
              bath
              startdate
              enddate
              currencytype
              rate
              minstay
              maxadults
              maxchild
              description
              unit
              city
              state
              zip
              country
              address
              location
              owner
          }
    }
  }
`;




export { LatestPostingsQuery, TravelerLoginQuery, OwnerLoginQuery, PropertySearchQuery, PropertyDetailsQuery, AccountDetailsQuery, TripsBoardQuery};
