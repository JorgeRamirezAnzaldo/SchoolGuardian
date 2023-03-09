//Import react, useState and necessary hooks/components from react-router-dom
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
//Import Icon, Modal and Button from semantic-ui-react
import { Icon, Modal, Button } from 'semantic-ui-react';
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
    const [signState, setSignState] = useState([]);
    //Define state variable to control modal opening/closing
    const [open, setOpen] = useState({show: false, id: ""});

    //Use useEffect hook to change studentState using the data returned from db
    useEffect(() => {
        if (data?.student.alerts) { //If there is data for students returned
          setSignState(data.student.alerts); //Set studentState with the students data
        }
      }, [data]);

    
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
        const alertId=event.target.id; //Get the id of the alert to be signed
        setOpen({show:false, id: ""}); //Close Modal
        let copySignState=JSON.parse(JSON.stringify(signState)); //Copy the student alerts data
        for(let i=0; i<copySignState.length;i++){ //Loop over all the alerts of the student
            if(copySignState[i]._id===alertId){ //If the alert id matches the id of the alert to be signed
                copySignState[i].sign=true; //Change the sign to true
                }
        }
        setSignState(copySignState); //Set the state for student alerts data
        try{
            //Sign alert using its id
            const{data}=await signAlert({
                variables: {id:alertId,sign:true}
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
        <>  
        <Modal
            onClose={() => setOpen({show: false, id: ""})}
            onOpen={() => setOpen({show: true, id: open.id})}
            open={open.show}
        >
            <Modal.Header>Please Confirm</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to sign this Alert?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button style={styles.button} id={open.id} onClick={handleSignAlert}>
                Confirm
                </Button>
                <Button style={styles.button} onClick={() => setOpen({show:false, id: ""})}>
                Cancel
                </Button>
            </Modal.Actions>
        </Modal>
        <div className="container" style={{marginTop: "80px"}}>
            <div className="ui equal width center aligned padded grid">
                <div className="row" >
                    <div className="column">
                        <div className="ui centered">
                            <h1 style={{color:"white"}}>Student: {student.name}</h1>
                            <table className="ui celled stackable table">
                                <thead>
                                    <tr>
                                        <th className="center aligned" style={styles.background}><h3>Subject</h3></th>
                                        <th className="center aligned" style={styles.background}><h3>From</h3></th>
                                        <th className="center aligned" style={styles.background}><h3>Message</h3></th>
                                        <th className="center aligned" style={styles.background}><h3>Sign</h3></th>
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
                                        <td className="center aligned"><h3>{alert.subject}</h3></td>
                                        {alert.from.principal?(<td className="center aligned"><h3>Principal</h3></td>):(<td className="center aligned"><h3>{alert.userId.name}</h3></td>)}
                                        <td className="center aligned"><h3>{alert.message}</h3></td>
                                        {alert.sign?( 
                                            <td className='positive center aligned'><Icon color='green' size='huge' name='checkmark' /></td>
                                        ):(
                                            <td className='positive center aligned'><Icon color='black' size='huge' name='edit outline' onClick={() => setOpen({show:true, id: alert._id})} id={alert._id} /></td>
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
    </>
    );
}

//Export StudentAlert page
export default StudentAlert;