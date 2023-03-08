import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROFESSOR } from '../utils/queries';

const ClassesProfessor = () => {
    const {userId} = useParams();
    const { loading, data } = useQuery(QUERY_PROFESSOR,{ variables:{ userId: userId}});
    const professor = data?.professor || {};
    console.log(professor);

    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            boxShadow:"none",
            height: "200px",
            width: "250px"
        },
        title:{
            color:"white",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginTop: ".2em",
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
                    (
                    <div className="ui centered three stackable cards">
                    {professor.classes.map((singleClass) => ( 
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/class/${singleClass._id}`} >
                                <div className="content" >
                                    <i className="huge circular pencil alternate icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider" style={{marginTop:".1em", marginBottom:".1em"}}></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                            {singleClass.name}
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </div>)}
                </div>
            </div>
        </div>
    </div>
  );
};
export default ClassesProfessor;







