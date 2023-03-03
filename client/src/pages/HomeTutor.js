import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TUTOR} from '../utils/queries';
const HomeTutor = ({userId}) => {
    const { loading, data } = useQuery(QUERY_TUTOR,{ variables:{ userId: userId}});
    console.log(data);
    const tutor = data?.tutor || {};
    console.log(tutor);
    console.log(loading);
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
                    {loading ? (
                    <>
            <div >{loading}</div>
                    </>
                    ) :
                    (<div className="ui centered three stackable cards">{tutor.students.map((student) =>(
                        <div key={student.registration} className="ui centered card" style={styles.background}>
                            <Link to={`/students/${student._id}`}>
                                <div className="content" >
                                    <i className="massive circular user icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        {student.name}
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    ))}</div>)}
                </div>
              </div>
            </div>
        </div>
  );
};
export default HomeTutor;







