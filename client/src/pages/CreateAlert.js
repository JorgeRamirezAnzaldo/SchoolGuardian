//Import react and necessary hooks/components from react-router-dom
import React, { useState } from "react";
import { useLocation, Navigate } from 'react-router-dom';
//Import useQuery and useMutation hooks from @apollo/client
import { useMutation, useQuery } from '@apollo/client';
//Import CREATE_ALERT and ASSIGN_ALERT mutations
import { CREATE_ALERT, ASSIGN_ALERT } from '../utils/mutations';
//Import QUERY_STUDENTS query
import { QUERY_STUDENTS} from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define CreateAlert function
const CreateAlert = () => {
    //Define location using useLocation hook
    const location =useLocation();
    //Get the schoolId and professorId from the location.state
    const {schoolId, professorId} =location.state;

    //Use query QUERY_STUDENTS to get the students by school
    const { loading, data } = useQuery(QUERY_STUDENTS,{ variables:{ school: schoolId}});
    //Extract students data from data
    const students = data?.students || {};
    //Define state variable for the alert form data
    const [alertFormData, setAlertFormData] = useState({subject: "", message: ""});
    //Use mutation CREATE_ALERT to create a new alert
    const [createAlert] = useMutation(CREATE_ALERT);
    //Use mutation ASSIGN_ALERT to assign an alert to a student
    const [assignAlert] = useMutation(ASSIGN_ALERT);
    //Define state variable to control alert creation status
    const [alertsCreated, setAlertCreation] = useState("Initial");

    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    //Function to handle input changes in alert creation form
    const handleInputChange = (event) => {
        const { name, value} = event.target; //Get the name and value of the input field changed
        setAlertFormData({ ...alertFormData, [name]: value}); //Set the form data state with the new value
    }

    //Function to handle the form submission to create an alert
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setAlertCreation("Processing"); //Set alert creation status to Processing
        try{
            for(let i=0; i<students.length;i++){ //For each student of the school
                const alert = await createAlert({ //Create a new alert using the form data
                    variables: {
                        subject: alertFormData.subject,
                        message: alertFormData.message,
                        from: professorId,
                        sign: false
                    }
                })
                //Get the id of the new alert
                const alertId = alert.data.createAlert._id;
                //Assign the new alert to the proper student using its id
                const assign = await assignAlert({
                    variables: {alertId:alertId, studentId: students[i]._id}
                })
            }
            setAlertCreation("Submitted"); //Set alert creation status to Submitted
        }catch(err){ //Catch any possible error
            console.error(err); //Diplay error
        }
        //Clean input fields of the form
        setAlertFormData({
            subject: "",
            message: ""
        })
        //Use a delay to change alert creation status
        setTimeout(() => {
            setAlertCreation("Initial"); //Change alert creation status to Initial after 3 seconds
        }, 3000);
        
    }

    //Define styles for page
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            marginTop:"1em"
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        button: {
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            color: "white"
        }
    }

    //Return all necessary elements with alert creation form
    return ( 
    <>  {loading ? (
            <>
            <div >Loading...</div>
            </>
        ) :
        (<>
        <div className="ui hidden divider"style={{padding: "1em"}}></div>
        <div className="ui two column center aligned grid padded" style={{marginTop: "30px"}}>
            <div className="column"style={{maxWidth: "750px", marginTop: "30px "}}>
                <i className="ui center aligned big circular bullhorn icon"style={{color: "white", marginTop:".5em"}}></i>
                <div className="ui hidden divider"style={{margin:"0 1em"}}></div>
                <h1 className="ui image header" style={{color: "white",marginBottom: "1.2em",  fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
                    <div className="content">
                        Create Alert
                    </div>
                </h1>
                <form className="ui form center aligned" onSubmit={handleFormSubmit}>
                    <div className="ui fluid input" style={{marginTop:" 2em"}}>
                        <input type="text" placeholder="Subject" name="subject" onChange={handleInputChange} value={alertFormData.subject}></input>
                    </div>
                    <div className="ui fluid  input" style={{marginTop: "2em"}}>
                        <input type="text" placeholder="Message" name="message" onChange={handleInputChange} value={alertFormData.message} ></input>
                    </div>
                        <button className="ui fluid large teal submit button" style={styles.background}
                        type="submit"
                        >
                        Submit
                        </button>
                </form>
                {alertsCreated == "Submitted" ? (
                    <div style={styles.title}>Alert has been created and sent</div>
                ):( <>{alertsCreated == "Processing" ? (
                    <div style={styles.title}>Creating alerts...</div>
                    ):(
                    <div style={styles.title}>Introduce the data for new alert</div>
                    )}</>
                )}
            </div>
        </div>
        </>)}
    </>
  );
};

//Export CreateAlert page
export default CreateAlert;