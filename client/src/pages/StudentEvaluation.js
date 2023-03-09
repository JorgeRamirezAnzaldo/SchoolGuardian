//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
//Import QUERY_STUDEVAL query
import { QUERY_STUDEVAL} from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define StudentEvaluation function
const  StudentEvaluation = () => {
    //Get student id using useParams()
    const {id} = useParams(); 
    //Define location using useLocation hook          
    const location =useLocation();
    //Get the classA with all student classes from the location.state
    const {classA} =location.state;
    //Use query QUERY_STUDEVAL to get the student evaluations by student id
    const { loading, data } = useQuery(QUERY_STUDEVAL,{ variables:{ id: id}});
    
    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }
    /*let fullData={
        classText:'',
        evaluations: [],
        average: ''
    };*/

    //Initialize variables
    let fullData = {};
    const finalData=[];
    let studentName = "";

    //If query has ended
    if (!loading){
        for(let i = 0; i < classA.length; i++){ //Loop over all student classes
            fullData={};
            const filtered = data.studentEvaluation.filter((studE) =>{ //Filter the student evaluations using the class id
                if(studE.classId._id===classA[i]){
                    return true;

                }return false;
            })
            //Obtain the sum of the scores using the filtered student evaluations
            const sum = filtered.reduce((a, b) => a + b.score, 0);
            const average = sum/filtered.length; //Get the average score
            const avgstring = average.toFixed(2); //Fix the average to 2 decimals
            fullData.average = avgstring; //Set the average for the class
            fullData.classText = filtered[0].classId.name; //Set the name of the class
            //Set the student evaluations filtered by class
            fullData.evaluations=filtered;
            //Add all data for the class to the final array
            finalData.push(fullData);

        }
        //Get student name to display it
        studentName = finalData[0].evaluations[0].studentId.name;
       
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

    //Return all necessary elements with student evaluations table
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
                                        <th className="center aligned" style={styles.background}>Class Name</th>
                                        <th className="center aligned" style={styles.background}>Evaluation 1</th>
                                        <th className="center aligned" style={styles.background}>Evaluation 2</th>
                                        <th className="center aligned" style={styles.background}>Evaluation 3</th>
                                        <th className="center aligned" style={styles.background}>Evaluation 4</th>
                                        <th className="center aligned" style={styles.background}>Evaluation 5</th>
                                        <th className="center aligned" style={styles.background}>Average score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalData.map((item,index) => (
                                    <tr key={index}>
                                        <td className="center aligned" key={'class' + index}>{item.classText}</td>
                                        {item.evaluations.map((subitem, index2) => (
                                            <React.Fragment key={"ScoreCell" + index + "." + index2}>
                                             {subitem.score >= 6 ? (
                                                <td className='center aligned positive' data-tooltip={subitem.evaluationDate} key={'posscore' + index + '.' + index2}>{subitem.score}</td>
                                             ):(
                                                <td className='center aligned negative' data-tooltip={subitem.evaluationDate} key={'negscore' + index + '.' + index2}>{subitem.score}</td>
                                             )}
                                            </React.Fragment>
                                        ))}                                               
                                        <td className="center aligned" key={'average' + index}>{item.average}</td>
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

//Export StudentEvaluation page
export default StudentEvaluation;