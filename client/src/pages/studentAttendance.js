import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useParams,useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STUDATT} from '../utils/queries';

const   StudentAttendance = () => {
    const {id} = useParams();
            
    const location =useLocation();
    const {classA} =location.state;

    const { loading, data } = useQuery(QUERY_STUDATT,{ variables:{ id: id}});

        /*let fullData={
            classText:'',
            attendances: [],
            absences: ''
        };*/
        let fullData = {};
        const finalData=[];
        let studentName = "";
    if (!loading){
        for(let i = 0; i < classA.length; i++){
            fullData={};
            const filtered = data.studentAttendance.filter((studA) =>{
                if(studA.classId._id===classA[i]){
                    return true;

                }return false;
            })
            const sum = filtered.reduce((a, b) => {
                if (b.attended == false){
                    a++;
                }
                return a;
            }, 0);
            fullData.absences = sum;
            fullData.classText = filtered[0].classId.name;

            fullData.attendances=filtered;

            finalData.push(fullData);

        }
       console.log(finalData);
       studentName = finalData[0].attendances[0].studentId.name;

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
export default StudentAttendance;