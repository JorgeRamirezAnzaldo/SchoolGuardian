//Import react and necessary hooks/components from react-router-dom
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
//Import useQuery and useMutation hooks from @apollo/client
import { useQuery, useMutation } from '@apollo/client';
//Import Modal and Button from semantic-ui-react
import { Modal, Button } from 'semantic-ui-react';
//Import QUERY_STUDENTS query
import { QUERY_STUDENTS } from '../utils/queries';
//Import DELETE_STUDENT mutation
import { DELETE_STUDENT } from '../utils/mutations';
//Import Auth methods
import Auth from '../utils/auth';

//Define DeleteStudents function
const DeleteStudents = () => {
    //Define location using useLocation hook
    const location = useLocation();
    //Get the schoolId from the location.state
    const {schoolId} =location.state;

    //Use query QUERY_STUDENTS to get the students by school
    const { loading, data } = useQuery(QUERY_STUDENTS,{ variables:{ school: schoolId}});
    //Extract students data from data
    let students = data?.students || [];
    //Define state variable to define the students data
    const [studentState, setStudentState] = useState([]);
    //Define state variable to control modal opening/closing
    const [open, setOpen] = useState({show: false, id: ""});

    //Use useEffect hook to change studentState using the data returned from db
    useEffect(() => {
        if (data?.students) { //If there is data for students returned
          setStudentState(data.students); //Set studentState with the students data
        }
      }, [data]);

    //Use DELETE_STUDENT mutation to delete a student
    const [deleteStudent] = useMutation(DELETE_STUDENT);

    //Validate if user is not logged in
    if (!Auth.loggedIn()) {
        return (
        <Navigate to="/Login"/> //Navigate to Login page
        );
    }

    //Function to handle the student delete
    const handleDeleteStudent = async (event) =>{
        const id = event.target.id; //Get the id of the delete button 
        setOpen({show:false, id: ""}); //Close Modal
        try{
            //Delete student using its id
            const deleteStud = await deleteStudent({
                variables: {
                    _id: id
                }
            });
            //Create a new arrary of students without the deleted student
            let studentsFilter = students.filter( (student) => student._id !== id);
            //Change studentState with the updated students
            setStudentState(studentsFilter);
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

    //Return all necessary elements to display all students with an individual deletion button
    return(
        <>  
        <Modal
            onClose={() => setOpen({show: false, id: ""})}
            onOpen={() => setOpen({show: true, id: open.id})}
            open={open.show}
        >
            <Modal.Header>Please Confirm</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this Student?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button style={styles.button} id={open.id} onClick={handleDeleteStudent}>
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
                                                onClick={() => setOpen({show:true, id: student._id})}
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
        </>
    );



}

//Export DeleteStudents page
export default DeleteStudents;