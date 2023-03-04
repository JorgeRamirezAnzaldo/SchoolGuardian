import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useParams,useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STUDATT} from '../utils/queries';
import { QUERY_STUDENT} from '../utils/queries';

const   StudentAttendance = () => {
    const {id} = useParams();
    console.log(id);
            
        //const { loading, data } = useQuery(QUERY_STUDATT,{ variables:{ _id: id, classId: data.student.classes[i]._id}});
        const location =useLocation();
        const {classA} =location.state;
        console.log(classA);
        const { loading, data } = useQuery(QUERY_STUDATT,{ variables:{ id: id}});
        console.log(data);
        /*let fullData={
            classText:'',
            attendances: [],
        };*/
        let fullData = {};
        const finalData=[];
    if (!loading){
        for(let i = 0; i < classA.length; i++){
            //fullData.attendances=[];
            fullData={};
            const filtered = data.studentAttendance.filter((studA) =>{
                if(studA.classId._id===classA[i]){
                    return true;

                }return false;
            })
            //console.log(filtered);
            fullData.classText = filtered[0].classId.name;
            //console.log(fullData);

            fullData.attendances=filtered;
            //console.log(fullData);

            finalData.push(fullData);

        }
       console.log(finalData);

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
                            <h1 style={{color:"white"}}>Student: StudentName</h1>
                            <table className="ui celled padded table">
                                <thead>
                                    <tr>
                                        <th style={styles.background}>Class</th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}>Total Absences</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalData.map((item,index) => (
                                    <tr>
                                        <td>{item.classText}</td>
                                        {item.attendances.map((subitem,index2) => (
                                            <>
                                             {subitem.attended ? (
                                                <td className='positive'><Icon color='green' size='large' name='checkmark' /></td>
                                             ):(
                                                <td className='negative'><Icon color='red' size='large' name='x' /></td>
                                             )}
                                            </>
                                        ))}                                               
                                        <td>N</td>
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
export default StudentAttendance;