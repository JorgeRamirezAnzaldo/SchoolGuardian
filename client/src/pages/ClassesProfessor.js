//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
//Import QUERY_PROFESSOR query
import { QUERY_PROFESSOR } from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define ClassesProfessor function
const ClassesProfessor = () => {
    //Get the userId with useParams()
    const {userId} = useParams();
    //Use query QUERY_PROFESSOR to get the professor data using its userId
    const { loading, data } = useQuery(QUERY_PROFESSOR,{ variables:{ userId: userId}});
    //Extract professor data from data
    const professor = data?.professor || {};

    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    //Define styles for page
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            boxShadow:"none",
            height: "200px",
            width: "250px"
        },
        title:{
            color:"white",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginTop: ".2em",
        },
    }

    //Return all necessary elements with proper professor data in place
    return (
    <div className="container" style={{marginTop: "80px"}}>
        <div className="ui equal width center aligned padded grid">
            <div className="row" >
                <div className="column">
                {loading ? (
                    <>
                    <div >Loading...</div>
                    </>
                    ) :
                    (
                    <div className="ui centered three stackable cards">
                    {professor.classes.map((singleClass, index) => ( 
                        <div className="ui centered card" style={styles.background} key={index}>
                            <Link to={`/class/${singleClass._id}`} >
                                <div className="content" >
                                    <i className="huge circular pencil alternate icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider" style={{marginTop:".1em", marginBottom:".1em"}}></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                            {singleClass.name}
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </div>)}
                </div>
            </div>
        </div>
    </div>
  );
};

//Export ClassProfessor page
export default ClassesProfessor;







