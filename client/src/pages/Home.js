import React from "react";
import HomeTutor from "./HomeTutor";
import Header from "../components/Header";
import DashboardPrincipal from "./DashboardPrincipal";
import DashboardProfessor from "./DashboardProfessor";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. 
      </h4>
    );
  }

  if (user.usertype == "Principal") {
    return (
      <div className="container">
          <DashboardPrincipal userId = {user._id}/>
      </div>
    );
  } else if (user.usertype == "Tutor"){
    return (
      <div className="container">
          <HomeTutor userId = {user._id}/>
      </div>
    );
  }else if (user.usertype == "Professor"){
    return (
      <div className="container">
        <DashboardProfessor userId = {user._id}/>
      </div>
    );
  }

  
};

export default Home;
//<Header username = {user.name}/>