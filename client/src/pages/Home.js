//Import react and necessary hooks/components from react-router-dom
import React from "react";
import { Navigate } from 'react-router-dom';
//Import necessary pages
import HomeTutor from "./HomeTutor";
import DashboardPrincipal from "./DashboardPrincipal";
import DashboardProfessor from "./DashboardProfessor";
//Import QUERY_ME query
import { QUERY_ME } from "../utils/queries";
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';

//Define Home function
const Home = () => {

  //Use query QUERY_ME to get the user data
  const { loading, data } = useQuery(QUERY_ME);
  //Get the me data from data
  const user = data?.me || {};

  //If loading is true
  if (loading) {
    return <div>Loading...</div>; //Return proper message
  }

  //If user is not logged in
  if (!user?.username) {
    return (
      <Navigate to="/Login"/> //Navigate to Login page
    );
  }

  //If user is a Principal
  if (user.usertype == "Principal") {
    //Return DashboardPrincipal page
    return (
      <div className="container">
          <DashboardPrincipal userId = {user._id}/>
      </div>
    );
  } else if (user.usertype == "Tutor"){ //If user is a Tutor
    //Return HomeTutor page
    return (
      <div className="container">
          <HomeTutor userId = {user._id}/>
      </div>
    );
  }else if (user.usertype == "Professor"){ //If user is a Professor
    //Return DashboardProfessor page
    return (
      <div className="container">
        <DashboardProfessor userId = {user._id}/>
      </div>
    );
  }

  
};

//Export Home page
export default Home;