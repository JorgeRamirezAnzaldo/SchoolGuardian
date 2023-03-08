import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STUDENT} from '../utils/queries';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SIGN_ALERT } from '../utils/mutations';
import "../index.css";

const   StudentAlert = () => {
    const {id} = useParams();
    console.log(id);
    const { loading, data } = useQuery(QUERY_STUDENT,{ variables:{ _id: id}});
    const student = data?.student || {};
    console.log(student);
    const [signState, setSignState] = useState(student.alerts);
    const [signAlert, {error}] = useMutation(SIGN_ALERT);
    console.log(signState);

    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/>
        );
    }

    const handleSignAlert=async(event)=>{
        const id=event.target.id;
        console.log("Firma de alerta");
        let copySignState=JSON.parse(JSON.stringify(signState));
        console.log(copySignState);
        for(let i=0; i<copySignState.length;i++){
            if(copySignState[i]._id===id){
                copySignState[i].sign=true;
                }
        }
        setSignState(copySignState);
        try{
            const{data}=await signAlert({
                variables: {id:id,sign:true}
            })
        }catch(err){
            console.error(err);
        }
    }
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
export default StudentAlert;