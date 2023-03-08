//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
//Import useQuery hook from @apollo/client
import { useQuery} from '@apollo/client';
//Import QUERY_CLASS query
import { QUERY_CLASS } from '../utils/queries';
//Import Auth methods
import Auth from '../utils/auth';

//Define ClassesStudents function
const ClassStudents = () => {
    //Get the classId with useParams()
    const {classId}= useParams();
    //Use query QUERY_CLASS to get the class data using its id
    const { loading, data } = useQuery(QUERY_CLASS,{ variables:{ _id: classId}});
    //Extract class data from data
    let singleClass = data?.class || [];

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

    //Return all necessary elements with proper class data in place
    return(
        <div className="container" style={{marginTop: "80px"}}>
            <div className="ui equal width center aligned padded grid">
                <div className="row" >
                    <div className="column">
                        <div className="ui centered">
                            <h1 style={{color:"white"}}>Students:</h1>
                            <table className="ui celled padded table">
                                <thead>
                                    <tr className='collapsing'>
                                        <th className="center aligned" style={styles.background}>Student</th>
                                        <th className="center aligned" style={styles.background}>Registration No.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading?  (
                                    <tr>
                                        <td className='center aligned'>loading...</td>
                                    </tr>
                                ):(
                                    <>
                                        {singleClass.students.map((student) => (
                                        <tr key={student._id}>
                                            <td className="center aligned">{student.name}</td>
                                            <td className="center aligned">{student.registration}</td>               
                                        </tr>
                                        ))}
                                    </>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

//Export ClassStudents page
export default ClassStudents;