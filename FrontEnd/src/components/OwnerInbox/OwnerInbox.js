import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import "react-alice-carousel/lib/alice-carousel.css";
import cookie from 'react-cookies';
import OwnerShowMessages from '../OwnerShowMessages/OwnerShowMessages'


var len = 0;
class OwnerInbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Messages: [],
            NoMessagestoShow : true
          }
      } 
      componentDidMount() {
          console.log("Mounted")
       // var url = 'http://localhost:4004/owner/inbox'
       var url = 'http://13.52.55.245:4004/owner/inbox'
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username : localStorage.getItem("ownery")
            })
          })
          .then(response => response.json())
          .then(messages => { 
         console.log("Messages are",messages)
         console.log(" --- " ,messages.length)
         len = messages.length
         console.log("Length is " + len)
       if(len)
       {
        this.setState({Messages : messages})
         this.setState({NoMessagestoShow : false});
       }
       else
       {
           this.setState({NoMessagestoShow : true});
       } 
     })
     }
    
      render() {
    
        let NoMessages = null;
        let Redirect_to_Home = null;
        let ShowMessage = null;
        var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
         if(USERTYPE==="owner")
       {
            console.log("Inside Inbox")
         if(this.state.NoMessagestoShow === true)
          {
              NoMessages = (<p class="blueerror errorcenter"><h3>You currently do not have any messages to display! Inbox Empty</h3></p> )
          }
          else
          {
            ShowMessage =  ( <div class="padtop">{
                this.state.Messages.map((message, i) => {
                    console.log("-----",message.Messages[0].prop_id)
                    console.log("-----",message.Messages[0].owner)
                    console.log("-----",message.Messages[0].traveler)
                     return (
                       <OwnerShowMessages
                         key={i}
                         prop_id = {message.Messages[0].prop_id}
                         ownername = {message.Messages[0].owner}
                         traveler = {message.Messages[0].traveler}
                         />
                     ); //return
                   }) //map
               }
           </div>)
          }
        }
        else
        {
            Redirect_to_Home = (<Redirect to="/owner/login" />)
        }
        return (
            <div>
            {Redirect_to_Home}
            <br />
             <hr />
             <div class="headingtrips">
                <h1> Traveler Inbox </h1>
            </div>
            {NoMessages}
            {ShowMessage}
           {/*  <TravelHistory trips={this.props.SearchPlaces.latesttrips} /> */}
             </div>
            );
      }
    }
    /*
  constructor(props) {
    super(props);
    this.state = {
        Messages: [],
        NoMessagestoShow : true
      }
  } 
  componentDidMount() {
      console.log("Mounted")
    var url = 'http://localhost:4004/owner/inbox'
    fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username : localStorage.getItem("ownery")
        })
      })
      .then(response => response.json())
      .then(messages => { 
     console.log("Messages are",messages)
     console.log(" --- " ,messages.length)
     len = messages.length
     console.log("Length is " + len)
   if(len)
   {
    this.setState({Messages : messages})
     this.setState({NoMessagestoShow : false});
   }
   else
   {
       this.setState({NoMessagestoShow : true});
   } 
 })
 }

  render() {

    let NoMessages = null;
    let Redirect_to_Home = null;
    let ShowMessage = null;
    if(cookie.load('cookie'))
    {
        console.log("Inside Inbox")
     if(this.state.NoMessagestoShow === true)
      {
          NoMessages = (<p class="blueerror errorcenter"><h3>You currently do not have any messages to display! Inbox Empty</h3></p> )
      }
      else
      {
        ShowMessage =  ( <div class="padtop">{
            this.state.Messages.map((message, i) => {
                console.log("Messages", message.Messages[i])
                 return (
                   <OwnerShowMessages
                     key={message.id}
                     prop_id = {"16"}
                    ownername = {"Aditya"}
                     />
                 ); //return
               }) //map
           }
       </div>)
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
            <h1> Owner Inbox </h1>
        </div>
        {NoMessages}
        {ShowMessage}
         </div>
        );

  }
}
*/
export default OwnerInbox;

