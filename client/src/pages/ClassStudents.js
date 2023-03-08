import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useQuery} from '@apollo/client';
import { QUERY_CLASS } from '../utils/queries';


const ClassStudents = () => {

    const {classId}= useParams();
    const { loading, data } = useQuery(QUERY_CLASS,{ variables:{ _id: classId}});
    let singleClass = data?.class || [];
    console.log(singleClass);

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

export default ClassStudents;