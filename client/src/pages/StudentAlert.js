//Import react, useState and necessary hooks/components from react-router-dom
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
//Import Icon from semantic-ui-react
import { Icon } from 'semantic-ui-react';
//Import useQuery and useMutation hooks from @apollo/client
import { useQuery, useMutation } from '@apollo/client';
//Import QUERY_STUDENT query
import { QUERY_STUDENT} from '../utils/queries';
//Import SIGN_ALERT mutation
import { SIGN_ALERT } from '../utils/mutations';
//Import Auth methods
import Auth from '../utils/auth';
//Import index.css
import "../index.css";

//Define StudentAlert function
const StudentAlert = () => {
    //Get student id using useParams()
    const {id} = useParams();
    //Use query QUERY_STUDENT to get the student by id
    const { loading, data } = useQuery(QUERY_STUDENT,{ variables:{ _id: id}});
    //Extract student data from data
    const student = data?.student || {};
    //Define state variable to define the student alerts data
    const [signState, setSignState] = useState(student.alerts);
    //Use mutation SIGN_ALERT to set sign to true for an alert
    const [signAlert, {error}] = useMutation(SIGN_ALERT);

    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    //Function handle alert sign
    const handleSignAlert=async(event)=>{
        const id=event.target.id; //Get the id of the alert to be signed
        let copySignState=JSON.parse(JSON.stringify(signState)); //Copy the student alerts data
        for(let i=0; i<copySignState.length;i++){ //Loop over all the alerts of the student
            if(copySignState[i]._id===id){ //If the alert id matches the id of the alert to be signed
                copySignState[i].sign=true; //Change the sign to true
                }
        }
        setSignState(copySignState); //Set the state for student alerts data
        try{
            //Sign alert using its id
            const{data}=await signAlert({
                variables: {id:id,sign:true}
            })
        }catch(err){ //Catch any possible error
            console.error(err); //Display error
        }
    }

    //Define styles for page
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            boxShadow:"none",
            color:"white",
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        
    }

    //Return all necessary elements to display student alerts and the possibility to sign them
    return(
        <div className="container" style={{marginTop: "80px"}}>
            <div className="ui equal width center aligned padded grid">
                <div className="row" >
                    <div className="column">
                        <div className="ui centered">
                            <h1 style={{color:"white"}}>Student: {student.name}</h1>
                            <table className="ui celled stackable table">
                                <thead>
                                    <tr>
                                        <th className="center aligned" style={styles.background}>Subject</th>
                                        <th className="center aligned" style={styles.background}>From</th>
                                        <th className="center aligned" style={styles.background}>Message</th>
                                        <th className="center aligned" style={styles.background}>Sign</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <>
                                    
                                    </>
                                ) :
                                (<>
                                {
                                    signState.map((alert) => (
                                    <tr key={alert._id}>
                                        <td className="center aligned">{alert.subject}</td>
                                        {alert.from.principal?(<td className="center aligned">Principal</td>):(<td className="center aligned">{alert.userId.name}</td>)}
                                        <td className="center aligned">{alert.message}</td>
                                        {alert.sign?( 
                                            <td className='positive center aligned'><Icon color='green' size='huge' name='checkmark' /></td>
                                        ):(
                                            <td className='positive center aligned'><Icon color='black' size='huge' name='edit outline' onClick={handleSignAlert} id={alert._id} /></td>
                                        )}
                                    </tr>
                                ))}</>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Export StudentAlert page
export default StudentAlert;