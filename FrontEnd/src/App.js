import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import OwnerMain from './components/OwnerMain';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "http://localhost:4004/graphql"
});

//App Component
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
       <ApolloProvider client={client}>
        <div>
          <Main store={this.props.store}/>
          <OwnerMain />
        </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
