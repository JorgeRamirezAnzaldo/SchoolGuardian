import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_STUDENTS } from '../utils/queries';
import { DELETE_STUDENT } from '../utils/mutations';
import Auth from '../utils/auth';

const DeleteStudents = () => {

    const location = useLocation();
    const {schoolId} =location.state;
    console.log(schoolId);

    const { loading, data } = useQuery(QUERY_STUDENTS,{ variables:{ school: schoolId}});
    let students = data?.students || [];
    const [studentState, setStudentState] = useState([]);

    useEffect(() => {
        if (data?.students) {
          setStudentState(data.students);
        }
      }, [data]);

    //console.log(students);
    console.log(studentState);

    const [deleteStudent] = useMutation(DELETE_STUDENT);

    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/>
        );
    }

    const handleDeleteStudent = async (event) =>{
        const id = event.target.id;
        console.log(id);
        try{
            const deleteStud = await deleteStudent({
                variables: {
                    _id: id
                }
            });
            let studentsFilter = students.filter( (student) => student._id !== id)
            console.log(studentsFilter)
            setStudentState(studentsFilter);


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
                            <h1 style={{color:"white"}}>Students:</h1>
                            <table className="ui celled padded table">
                                <thead>
                                    <tr className='collapsing'>
                                        <th className="center aligned" style={styles.background}>Student</th>
                                        <th className="center aligned" style={styles.background}>Registration No.</th>
                                        <th className="center aligned" style={styles.background}>Delete Student</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading?  (
                                    <tr>
                                        <td className='center aligned'>loading...</td>
                                    </tr>
                                ):(
                                    <>
                                        {studentState.map((student) => (
                                        <tr key={student._id}>
                                            <td className="center aligned">{student.name}</td>
                                            <td className="center aligned">{student.registration}</td>               
                                            <td className="center aligned">
                                            <button className="ui small red submit button"
                                                id={student._id}
                                                type="button"
                                                onClick={handleDeleteStudent}
                                            >
                                                Delete
                                            </button>
                                            </td>
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

export default DeleteStudents;