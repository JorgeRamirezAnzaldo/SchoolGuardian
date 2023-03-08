//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
//Import useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
//Import QUERY_TUTOR query
import { QUERY_TUTOR} from '../utils/queries';

//Define HomeTutor function
const HomeTutor = ({userId}) => {
    //Use query QUERY_TUTOR to get the tutor by its usedId
    const { loading, data } = useQuery(QUERY_TUTOR,{ variables:{ userId: userId}});
    //Extract tutor data from data
    const tutor = data?.tutor || {};

    //Define styles for page
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

    //Return all necessary elements to place the students associated to the tutor
    return (
    <div className="container" style={{marginTop: "80px"}}>
        <div className="ui equal width center aligned padded grid">
            <div className="row" >
              <div className="column">
                    {loading ? (
                    <>
            <div >Loading...</div>
                    </>
                    ) :
                    (<div className="ui centered three stackable cards">{tutor.students.map((student) =>(
                        <div key={student.registration} className="ui centered card" style={styles.background}>
                            <Link to={`/student/${student._id}`}>
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

//Export HomeTutor page
export default HomeTutor;







