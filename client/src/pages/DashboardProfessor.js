import React from 'react';
import { Link } from 'react-router-dom';

const DashboardProfessor = ({userId}) => {
   
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
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/classes/${userId}`}>
                                <div className="content" >
                                    <i className="massive circular pencil alternate icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                            Classes
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default DashboardProfessor;







