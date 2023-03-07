import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STUDEVAL} from '../utils/queries';

const  StudentEvaluation = () => {
    const {id} = useParams();           
    const location =useLocation();
    const {classA} =location.state;
    const { loading, data } = useQuery(QUERY_STUDEVAL,{ variables:{ id: id}});
    /*let fullData={
        classText:'',
        evaluations: [],
        average: ''
    };*/
    let fullData = {};
    const finalData=[];
    let studentName = "";

    if (!loading){
        for(let i = 0; i < classA.length; i++){

            fullData={};
            const filtered = data.studentEvaluation.filter((studE) =>{
                if(studE.classId._id===classA[i]){
                    return true;

                }return false;
            })
            const sum = filtered.reduce((a, b) => a + b.score, 0);
            const average = sum/filtered.length;
            const avgstring = average.toFixed(2);
            fullData.average = avgstring;
            fullData.classText = filtered[0].classId.name;
            
            fullData.evaluations=filtered;
            //console.log(fullData);

            finalData.push(fullData);

        }
       console.log(finalData);
       studentName = finalData[0].evaluations[0].studentId.name;
       
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
                                        <th className="center aligned" style={styles.background}>Average score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalData.map((item,index) => (
                                    <tr>
                                        <td className="center aligned">{item.classText}</td>
                                        {item.evaluations.map((subitem,index2) => (
                                            <>
                                             {subitem.score >= 6 ? (
                                                <td className='center aligned positive' data-tooltip={subitem.evaluationDate}>{subitem.score}</td>
                                             ):(
                                                <td className='center aligned negative' data-tooltip={subitem.evaluationDate}>{subitem.score}</td>
                                             )}
                                            </>
                                        ))}                                               
                                        <td className="center aligned">{item.average}</td>
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
export default StudentEvaluation;