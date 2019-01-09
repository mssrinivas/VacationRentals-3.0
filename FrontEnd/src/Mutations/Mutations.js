import { gql } from "apollo-boost";

const MutationSignUp = gql`
  mutation SignUp(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
    $username: String
  ) {
    signup(firstname: $firstname, lastname: $lastname, email: $email, password: $password, username: $username) {
      username
    }
  }
`;

const loginMutation = gql`
  mutation Login($username: String, $password: String) {
    login(name: $username, password: $password) {
      status
    }
  }
`;

const MutationBookProperty = gql`
  mutation BookProperty(
    $prop_id: Int
    $startdate: String
    $enddate: String
    $username: String
  ) {
    BookProperty(
      prop_id: $prop_id
      startdate: $startdate
      enddate: $enddate
      username: $username
    ) {
      status
    }
  }
`;

const MutationAccountDetails = gql`
mutation AccountDetailsEdit(
    $firstname : String
    $lastname : String
    $school : String
    $contact : String
    $aboutme : String
    $company : String
    $hometown : String
    $language : String
    $gender : String
    $state : String
    $country : String
    $address : String
    $username : String
) {
    AccountDetailsEdit(
        firstname : $firstname
        lastname : $lastname
        school : $school
        contact: $contact
        aboutme : $aboutme
        company : $company
        hometown : $hometown
        language: $language
        gender : $gender
        state : $state
        country : $country
        address : $address
        username : $username

  ) {
    status
  }
}
`;
/*
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
            address: this.state.StreetAddress
*/

export { MutationSignUp, loginMutation, MutationBookProperty, MutationAccountDetails};