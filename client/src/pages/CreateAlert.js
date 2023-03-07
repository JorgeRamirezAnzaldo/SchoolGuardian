import React, { useState } from "react";
import { Icon } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { CREATE_ALERT } from '../utils/mutations';
import { ASSIGN_ALERT } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_STUDENTS} from '../utils/queries';
import { useLocation } from 'react-router-dom';

const CreateAlert = () => {
    const location =useLocation();
    const {schoolId, professorId} =location.state;

    const { loading, data } = useQuery(QUERY_STUDENTS,{ variables:{ school: schoolId}});
    const students = data?.students || {};

    const [alertFormData, setAlertFormData] = useState({subject: "", message: ""});
    const [createAlert] = useMutation(CREATE_ALERT);
    const [assignAlert] = useMutation(ASSIGN_ALERT);
    const [alertsCreated, setAlertCreation] = useState("Initial");

    const handleInputChange = (event) => {
        const { name, value} = event.target;
        setAlertFormData({ ...alertFormData, [name]: value});
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setAlertCreation("Processing");
        try{
            for(let i=0; i<students.length;i++){
                const alert = await createAlert({
                    variables: {
                        subject: alertFormData.subject,
                        message: alertFormData.message,
                        from: professorId,
                        sign: false
                    }
                })
                console.log(alert.data.createAlert._id);
                const alertId = alert.data.createAlert._id;
                const assign = await assignAlert({
                    variables: {alertId:alertId, studentId: students[i]._id}
                })
            }
            setAlertCreation("Submitted");
        }catch(err){
            console.error(err);
        }
        setAlertFormData({
            subject: "",
            message: ""
        })
        setTimeout(() => {
            setAlertCreation("Initial");
        }, 3000);
        
    }

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
  return (
        
    <>  {loading ? (
            <>
            <div >Loading...</div>
            </>
        ) :
        (<>
        <div className="ui hidden divider"style={{padding: "1em"}}></div>
        <div className="ui two column center aligned grid padded" style={{marginTop: "200px"}}>
            <div className="column"style={{maxWidth: "750px", marginTop: "200px "}}>
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

export default CreateAlert;