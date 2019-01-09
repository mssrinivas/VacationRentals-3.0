const graphql = require("graphql");
const _ = require("lodash");
var HomeAway = require("../model/HomeAway");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const bcrypt = require("bcrypt");
const saltRounds = 10;
var passport = require("passport");
const jwt = require("jsonwebtoken");
const dbName = "HomeAway";
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});
const loginType = new GraphQLObjectType({
  name: "login",
  fields: () => ({
    username: { type: GraphQLString }
  })
});
const signupType = new GraphQLObjectType({
  name: "signup",
  fields: () => ({
    username: { type: GraphQLString }
  })
});
const BookPropertyType = new GraphQLObjectType({
  name: "bookProperty",
  fields: () => ({
    status: { type: GraphQLString }
  })
});

const AccountDetailsResult = new GraphQLObjectType({
  name: "AccountDetails",
  fields: () => ({
    status: { type: GraphQLString }
  })
})


const TripDetails = new GraphQLObjectType({
  name: "TripsBoard",
  fields: () => ({
    booking_startdate: {type: GraphQLString},
    booking_enddate: {type: GraphQLString},
    booking_username : {type: GraphQLString},
    Property : { type: Temp }
  })
  });


const Bookings = new GraphQLObjectType({
  name: "Bookings",
  fields: () => (
    { 
    Bookings : {type : TripDetails}
    })
})

const Details = new GraphQLObjectType({
  name: "Details",
  fields: () => ({
firstname: { type: GraphQLString },
lastname: { type: GraphQLString },
school: { type: GraphQLString },
aboutme: { type: GraphQLString },
contact: { type: GraphQLString },
hometown: { type: GraphQLString },
language: { type: GraphQLString },
gender: { type: GraphQLString },
traveler: { type: GraphQLBoolean },
owner: { type: GraphQLBoolean },
state: { type: GraphQLString },
username: { type: GraphQLString },
country: { type: GraphQLString },
password: { type: GraphQLString },
address : {type: GraphQLString},
email : {type: GraphQLString},
company: { type: GraphQLString },
})
})

const UserDetails = new GraphQLObjectType({
  name: "UserDetails",
  fields: () => ({
      Users: {type: Details}
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const Temp = new GraphQLObjectType({
  name: "Temp",
  fields: () => ({
prop_id: { type: GraphQLInt },
name: { type: GraphQLString },
type: { type: GraphQLString },
location: { type: GraphQLString },
bed: { type: GraphQLInt },
bath: { type: GraphQLInt },
startdate: { type: GraphQLString },
enddate: { type: GraphQLString },
currencytype: { type: GraphQLString },
rate: { type: GraphQLInt },
minstay: { type: GraphQLInt },
maxadults: { type: GraphQLInt },
maxchild: { type: GraphQLInt },
description: { type: GraphQLString },
unit: { type: GraphQLString },
city: { type: GraphQLString },
state: { type: GraphQLString },
zip: { type: GraphQLString },
country: { type: GraphQLString },
address: { type: GraphQLString },
owner : {type: GraphQLString}
})
})

const Property = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    prop_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    location: { type: GraphQLString },
    bed: { type: GraphQLInt },
    bath: { type: GraphQLInt },
    startdate: { type: GraphQLString },
    enddate: { type: GraphQLString },
    currencytype: { type: GraphQLString },
    rate: { type: GraphQLInt },
    minstay: { type: GraphQLInt },
    maxadults: { type: GraphQLInt },
    maxchild: { type: GraphQLInt },
    description: { type: GraphQLString },
    unit: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
    address: { type: GraphQLString },
    owner : {type: GraphQLString}
  })
});


const Property1 = new GraphQLObjectType({
  name: "Property1",
  fields: () => ({
     Property : {type: Temp}
})
});
const PropertySearchType = new GraphQLObjectType({
  name: "PropertySearch",
  fields: () => ({
    properties: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    login: {
      type: loginType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        var user = {
          name: args.username,
          password: args.password,
          id: args.id
        };
        return new Promise((resolve, reject) => {
          console.log("args", user);
          MongoClient.connect(
            url,
            {
              poolSize: 10
            },
            function(err, client) {
              if (err) {
              
              } else {
                var username = user.name;
                const db = client.db(dbName);
                db.collection('HomeAway').findOne({'Users.username': username,'Users.traveler': true}, function (findErr, result) {
                  if (findErr) {
                          throw findErr;
                  }
                  else
                    {
                        console.log("USERNME", result)
                        if(result === null)
                        {
                            resolve(findErr)
                        }
                        else
                        {
                         bcrypt.compare(user.password,result.Users.password, function(err, answer) { 
                              if(answer){
                              const body = { _id: user.name, type: "traveler" };
                              const token = jwt.sign(
                                { user: body },
                                "HOMEAWAYUSER"
                              );   
                              console.log("User Authenticated Successfully")
                              console.log("Username is "+ JSON.stringify(username).pretty)
                            console.log("TOKEN IS", token)
                            var result = {
                              username: token
                            };
                            resolve(result);
                             }//if
                           else
                           {
                            var result = {
                              username: "username"
                            };
                            resolve(result);
                           }
                        })//bcrypt
                    }//else
                  }
                 });//db collection
              } //else
            }
          );
        });
      }
    },
    OwnerLogin: {
      type: loginType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        var user = {
          name: args.username,
          password: args.password,
          id: args.id
        };
        return new Promise((resolve, reject) => {
          console.log("args", user);
          MongoClient.connect(
            url,
            {
              poolSize: 10
              // other options can go here
            },
            function(err, client) {
              if (err) {
              
              } else {
                var username = user.name;
                const db = client.db(dbName);
                console.log("Database Connected");
                console.log("CAME HERE IN GRAPHQL")
                db.collection('HomeAway').findOne({'Users.username': username,'Users.owner': true}, function (findErr, result) {
                  if (findErr) {
                     res.writeHead(400,{
                              'Content-Type' : 'text/plain'
                          })
                          res.end("Invalid Credentials");
                          throw findErr;
                  }
                  else
                    {
                        console.log("USERNME", result)
                        if(result === null)
                        {
                            resolve(findErr)
                        }
                        else
                        {
                         bcrypt.compare(user.password,result.Users.password, function(err, answer) { 
                             console.log("answer is " +  JSON.stringify(answer))
                              if(answer){
                              console.log("Herethree") 
                              const body = { _id: user.name, type: "owner" };
                              const token = jwt.sign(
                                { user: body },
                                "HOMEAWAYUSER"
                              );   
                              console.log("Username is "+ JSON.stringify(username))
                            console.log("TOKEN IS", token)
                            var result = {
                              username: token
                            };
                            resolve(result);
                             }//if
                           else
                           {
                            var result = {
                              username: "username"
                            };
                            resolve(result); 
                           }
                        })//bcrypt
                    }//else
                  }
                 });//db collection
              } //else
            }
          );
        });
      }
    },
    search: {
      type: new GraphQLList(Property1),
      args: {
        placename: { type: GraphQLString },
        startdate: { type: GraphQLString },
        enddate: { type: GraphQLString },
        adultlist: { type: GraphQLInt },
        childlist: { type: GraphQLInt }
      },
      resolve(parent, args) {
        var Search = {
          placename: args.placename,
          startdate: args.startdate,
          enddate: args.enddate,
          adultlist: args.adultlist,
          childlist: args.childlist
        };
        return new Promise((resolve, reject) => {
          console.log("CAME TO SEARCH GRPAH QL")
          MongoClient.connect(
            url,
            {
              poolSize: 10
              // other options can go here
        }, function(err, client) {
          if (err) 
          {
          } //if
          else 
          {
            console.log("MAX ADULTS", Search.adultlist)
            const db = client.db(dbName);
            const regexcity = new RegExp(Search.placename,'i');
            db.collection('HomeAway').aggregate(
                  { 
                      $unwind: '$Property'
                  },
                  {
                  $match: 
                      {
                          $and:[
                            {"Property.city":regexcity},
                            {"Property.maxadults" : { $gte : Number(Search.adultlist)}},
                            {"Property.maxchild"  : { $gte : Number(Search.childlist)}},
                            {"Property.startdate" : { $lte : String(Search.startdate)}},
                            {"Property.enddate" : { $gte : String(Search.enddate)}}
                             ]
                      }
                  },
              {
                  $project :
                  {
                      Property : "$Property",
                      _id:0
                  }
              }
             ).toArray(function(findErr, result){
                          console.log("Query Output", JSON.stringify(result))
                          if (findErr) { 
                            var result = {
                              properties: null
                            };
                            resolve(result);
                              throw findErr;  
                          }//if
                          else
                          console.log("search result",result)
                              {
                                var resultone = {
                                  Property: result
                                };
                              resolve(result); 
                              }     
                      })//toarr
                    }//else
          })
        })
      }
    },
    propertydetails: {
      type: Property,
      args: {
        prop_id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        var property = {
          prop_id: args.prop_id
        };
        return new Promise((resolve, reject) => {
          console.log("args", property.prop_id);

          HomeAway.findOne({"Property.prop_id" : property.prop_id},
          {_id: 0,Property: {$elemMatch: {prop_id: property.prop_id}}}
          ,function(findErr, result){
                      console.log("Query Output", result)
                      if (findErr) { 
                          resolve(findErr);
                      }//if
                      else
                          {              
                          resolve(result.Property[0]);
                          }     
                  })
        });
      }
    },
    AccountDetailsQuery: {
      type: Details,
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        var Username = {
          username: args.username
        };
        return new Promise((resolve, reject) => {
          console.log("----", Username.username);
          MongoClient.connect(url, {  
            poolSize: 10
            // other options can go here
          }, function(err, client) {
            if (err) 
            {
            resolve(err)
            } //if
            else 
            {
              const db = client.db(dbName);
              db.collection('HomeAway').findOne({'Users.username':Username.username},{Users:1,_id:0},function(findErr, result){
              if (findErr) {
                resolve(findErr);
              }//if
              else
                {
                  resolve(result.Users);
                  console.log("USEER DETAILS",(result));
                }//else
              })
          }
        });
        });
      }
    },
    TripsBoardQuery : {
      type: new GraphQLList(Bookings),
      args: {
      username: { type: GraphQLString }
      },
      resolve(parent, args) {
      var trips = {
      username: args.username
      };
      return new Promise((resolve, reject) => {
                    MongoClient.connect(url, {  
                      poolSize: 10
                    }, function(err, client) {
                      if (err) 
                      {
                        resolve(findErr);
                      } //if
                      else 
                      {
                        const db = client.db(dbName);
                        db.collection('HomeAway').aggregate([
                    { "$match": {
                                "Users.username": {
                                    $eq: trips.username
                                }
                            }},
                    {$project :
                        {
                            Bookings :"$Bookings",
                            _id:0
                        }
                    }, 
                    { $unwind: '$Bookings'},  
                    {
                    $sort: {
                            "Bookings.booking_startdate":-1
                           }
                     } 
                ]).toArray(function(findErr, result){
                                  if(findErr)
                                  {
                                   resolve(findErr)
                                  }
                                  else{
                                    console.log("RESUKTS", result)
                              
                                    resolve(result)    
                                  }
                              }) 
                            } 
                            })
                          })
                        }
                      },

     LatestPostingsQuery : {
      type: new GraphQLList(Property1),
      args: {
      username: { type: GraphQLString }
      },
      resolve(parent, args) {
      var posting = {
      username: args.username
      };
      return new Promise((resolve, reject) => {
        MongoClient.connect(url, {  
          poolSize: 10
        }, function(err, client) {
          if (err) 
          {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Error while retrieving");
          } //if
          else 
          {
            const db = client.db(dbName);
            db.collection('HomeAway').aggregate([
              { 
                  "$match": 
                  {
                          "Users.username": {
                              $eq: posting.username
                          }
                  }},
              {
                  $project :
                  {
                      Property :"$Property",
                      _id:0
                  }
              }, 
              { 
                  $unwind: '$Property'
              },
              {
              $sort: {
                      "Property.prop_id":-1
                  }
              } 
             ]).toArray(function(findErr, result){
                  console.log("Query Output", result)
                  if (findErr) {    
                      resolve(findErr);
                  }//if
                  else
                      {
                         console.log("RESUKLT", result)
                         resolve(result)
                      }     
              })
        }
      })          
          })
        }
      }
  }
});

var count = 10;
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: signupType,
      args: {
        firstname: { type: GraphQLString },
        password: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        username: {type : GraphQLString}
      },
      resolve(parent, args) {
        let user = {
          firstname: args.firstname,
          lastname: args.lastname,
          password: args.password,
          email: args.email,
          username : args.username

        };
        return new Promise((resolve, reject) => {
          console.log("signup user ", user);
          bcrypt.hash(user.password, saltRounds, function(err, hash) {
            var password = hash;
            var SignUp = new HomeAway({
            Users :{
            username :user.username,
            password : user.password,
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            traveler : true
                }
            })
        var promise = SignUp.save();
        promise
        .then(function() {
        const body = { _id: user.username, type: "traveler" };
        const token = jwt.sign(
          { user: body },
          "HOMEAWAYUSER"
        );
        var result = {
          username: token
        };
        resolve(result);

        })
        .catch(function(err) {
        console.log("error:", err.message);
        var result = {
          status: null
        };
        resolve(result);
      });
    })
  })
     
    }
  },
  BookProperty: {
      type: BookPropertyType,
      args: {
        startdate: { type: GraphQLString },
        enddate: { type: GraphQLString },
        prop_id: { type: GraphQLInt },
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("book property args", args);
        var booking = {
          startdate: args.startdate,
          enddate: args.enddate,
          prop_id: args.prop_id,
          username: args.username
        };
        return new Promise((resolve, reject) => {
          console.log("book property user ", booking.username);
          HomeAway.findOne(
            {"Property.prop_id" : booking.prop_id},
            {_id: 0,Property: {$elemMatch: {prop_id: booking.prop_id}}} ,function(findErr, result){
                        console.log("Query Output", result)
                        if (findErr) { 
                          var result = {
                            status: "400"
                          };
                          resolve(result);
                        }//if
                        else
                            {
                              MongoClient.connect(
                                url,
                                {
                                  poolSize: 10
                                  // other options can go here
                                },
                                function(err, client) {
                                  if (err) {
                                  
                                  } else {
                              const db = client.db(dbName);
                                var PropertyDescription = result.Property[0];
                                db.collection('HomeAway').findOneAndUpdate({'Users.username':booking.username},{ "$push": { "Bookings":   {
                                    Property : PropertyDescription,
                                    "booking_startdate" : booking.startdate,
                                    "booking_enddate" : booking.enddate,
                                    "booking_username" : booking.username
                                    }}},function(findErr, results){
                                                if(findErr)
                                                {
                                                  var result = {
                                                    status: "400"
                                                  };
                                                  resolve(result);

                                                }
                                                else{
                                                console.log("booked prop", results);
                                                let result = {
                                                  status: "Succesfully Booked" //result1.value
                                                };
                                                resolve(result);
                                               }
                                            })//func
                            }//else
                        })//fing
                      }
                      })
                      })//retunrn
      }
  },

      AccountDetailsEdit : {
        type: AccountDetailsResult,
        args: {
          firstname: {  type: GraphQLString  },
          lastname: {  type: GraphQLString },
          aboutme: {  type: GraphQLString },
          company: {  type: GraphQLString },
          school: {  type: GraphQLString },
          hometown: {  type: GraphQLString },
          language : {  type: GraphQLString },
          gender: {  type: GraphQLString }, 
          state: {  type: GraphQLString },
          country: {  type: GraphQLString },
          contact: {  type: GraphQLString },
          address: {  type: GraphQLString },
          username: { type: GraphQLString}
        },
        resolve(parent, args) {
          console.log("args", args);
          var account = {
            firstname:  args.firstname,
            lastname: args.lastname,
            aboutme: args.aboutme,
            company: args.company,
            school: args.school,
            hometown: args.hometown,
            language : args.language,
            gender: args.gender, 
            state: args.state,
            country: args.country,
            contact: args.contact,
            address: args.address,
            username : args.username
          };
          return new Promise((resolve, reject) => {
            console.log("------ Traveler Account after MUTATUION -------------");
            MongoClient.connect(url, {  
              poolSize: 10
            }, function(err, client) {
              if (err) 
              {
                var result = {
                  status: "400"
                };
                resolve(result);
               
              } //if
              else 
              {
                const db = client.db(dbName);
                var username = account.username;
                db.collection('HomeAway').findOneAndUpdate({'Users.username': username},{ "$set": { "Users.school" : account.school,
                "Users.contact" : account.contact,
                "Users.aboutme" : account.aboutme,
                "Users.company" : account.company,
                "Users.hometown" : account.hometown,
                "Users.language" : account.language,
                "Users.gender" : account.gender,
                "Users.state" : account.state,
                "Users.country" : account.country,
                "Users.address" : account.address}},{new: true},function(err, resultone){
                  if (err) {
                    var result = {
                      status: "400"
                    };
                    resolve(result);
                  } else {
                    var result = {
                      status: "200"
                    };
                    resolve(result);
                  }
                });
              }//else
            });
                        })//retunrn
        }  
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});