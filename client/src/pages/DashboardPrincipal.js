import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROFESSOR } from '../utils/queries';

const DashboardPrincipal = ({userId}) => {
    console.log(userId);
    const { loading, data } = useQuery(QUERY_PROFESSOR,{ variables:{ userId: userId}});
    console.log(data);
    const professor = data?.professor || {};
    console.log(professor);
    let schoolId;
    let professorId;
    if (!loading){
        professorId = professor._id;
        schoolId = professor.schoolId._id;
        console.log(schoolId);
    }
   
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            boxShadow:"none",
            height: "400px",
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
    }

  return (
    <div className="container" style={{marginTop: "80px"}}>
        <div className="ui equal width center aligned padded grid">
            <div className="row" >
                <div className="column">
                    <div className="ui centered three stackable cards">      
                        {loading ? (
                            <>
                            <div >Loading...</div>
                            </>
                            ) :
                            (<>
                            <div className="ui centered card" style={styles.background}>
                            <Link to={`/createAlert`} state={{schoolId: schoolId, professorId: professorId}}>
                                <div className="content" >
                                    <i className="massive circular bullhorn icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                            Create Alert
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                            </div>
                            <div className="ui centered card" style={styles.background}>
                            <Link to={`/deleteStudent`} state={{schoolId: schoolId}}>
                                <div className="content" >
                                    <i className="massive circular user icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                            Delete Student
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default DashboardPrincipal;







