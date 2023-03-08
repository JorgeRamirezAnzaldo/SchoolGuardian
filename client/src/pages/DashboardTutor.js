//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
//Import QUERY_STUDENT query
import { QUERY_STUDENT} from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define DashboardTutor function
const DashboardTutor = () => {
    //Get student id using useParams()
    const {id} = useParams();
    //Use query QUERY_STUDENT to get the student by its id
    const { loading, data } = useQuery(QUERY_STUDENT,{ variables:{ _id: id}});
    //Initialize classes
    const classes=[];
    
    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    //If there is data from db
    if(data){
        for(let i=0; i<data.student.classes.length; i++){ //For all the classes in the student data
            classes.push(data.student.classes[i]._id); //Push class into the classes array
        }
    }

    //Define styles for page
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            boxShadow:"none",
            height: "400px",
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
    }

    //Return all necessary elements for DashboardTutor page
    return (
    <div className="container" style={{marginTop: "80px"}}>
        <div className="ui equal width center aligned padded grid">
            <div className="row" >
                <div className="column">
                    <div className="ui centered three stackable cards">
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/grades/${id}`} state={{classA:classes}}>
                                <div className="content" >
                                    <i className="massive circular tasks icon "style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Grades
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/attendance/${id}`} state={{classA:classes}}>
                                <div className="content" >
                                    <i className="massive circular calendar check outline icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Attendance
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/alerts/${id}`}>
                                <div className="content" >
                                    <i className="massive circular bullhorn icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Alerts
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

//Export DashboardTutor page
export default DashboardTutor;







