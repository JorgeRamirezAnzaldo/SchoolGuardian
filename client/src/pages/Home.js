import React from "react";
import HomeTutor from "./HomeTutor";
import Header from "../components/Header";
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

  return (
    <div className="container">
      <Header username = {user.name}/>
      <HomeTutor userId = {user._id}/>
    </div>
  );
};

export default Home;