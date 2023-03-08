//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
//Import Icon from semantic-ui-react
import { Icon } from 'semantic-ui-react';
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
//Import QUERY_STUDATT query
import { QUERY_STUDATT} from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define StudentAttendance function
const StudentAttendance = () => {
    //Get student id using useParams()
    const {id} = useParams(); 
    //Define location using useLocation hook
    const location =useLocation();
    //Get the classA with all student classes from the location.state
    const {classA} =location.state;
    //Use query QUERY_STUDATT to get the student attendances by student id
    const { loading, data } = useQuery(QUERY_STUDATT,{ variables:{ id: id}});

    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    /*let fullData={
        classText:'',
        attendances: [],
        absences: ''
    };*/

    //Initialize variables
    let fullData = {};
    const finalData=[];
    let studentName = "";

    //If query has ended
    if (!loading){
        for(let i = 0; i < classA.length; i++){ //Loop over all student classes
            fullData={};
            const filtered = data.studentAttendance.filter((studA) =>{ //Filter the student attendances using the class id
                if(studA.classId._id===classA[i]){
                    return true;

                }return false;
            })
            //Obtain the total of absences using the filtered student attendances
            const sum = filtered.reduce((a, b) => {
                if (b.attended == false){
                    a++;
                }
                return a;
            }, 0);
            //Set the sum of absences
            fullData.absences = sum;
            //Set the name of the class
            fullData.classText = filtered[0].classId.name;
            //Set the student attendances filtered by class
            fullData.attendances=filtered;
            //Add all data for the class to the final array
            finalData.push(fullData);

        }
        //Get student name to display it
        studentName = finalData[0].attendances[0].studentId.name;

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

    //Return all necessary elements with student attendances table
    return(
        <div className="container" style={{marginTop: "80px"}}>
            <div className="ui equal width center aligned padded grid">
                <div className="row" >
                    <div className="column">
                        <div className="ui centered">
                            <h1 style={{color:"white"}}>Student: {studentName}</h1>
                            <table className="ui celled padded table">
                                <thead>
                                    <tr>
                                        <th className="center aligned" style={styles.background}>Class</th>
                                        <th className="center aligned" style={styles.background}></th>
                                        <th className="center aligned" style={styles.background}></th>
                                        <th className="center aligned" style={styles.background}></th>
                                        <th className="center aligned" style={styles.background}></th>
                                        <th className="center aligned" style={styles.background}></th>
                                        <th className="center aligned" style={styles.background}>Total Absences</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalData.map((item,index) => (
                                    <tr>
                                        <td className="center aligned">{item.classText}</td>
                                        {item.attendances.map((subitem,index2) => (
                                            <>
                                             {subitem.attended ? (
                                                <td className='positive center aligned' data-tooltip={subitem.attendanceDate}><Icon color='green' size='large' name='checkmark' /></td>
                                             ):(
                                                <td className='negative center aligned' data-tooltip={subitem.attendanceDate}><Icon color='red' size='large' name='x' /></td>
                                             )}
                                            </>
                                        ))}                                               
                                        <td className="center aligned">{item.absences}</td>
                                    </tr>
                                    ))}
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Export StudentAttendance page
export default StudentAttendance;