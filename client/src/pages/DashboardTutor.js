import React from 'react';
import { Link } from 'react-router-dom';
const HomeTutor = () => {
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
                            <Link to={`/grades`}>
                                <div className="content" >
                                    <i className="massive circular tasks icon "style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Grades
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/attendance`}>
                                <div className="content" >
                                    <i className="massive circular calendar check outline icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Attendance
                                        </div>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className="ui centered card" style={styles.background}>
                            <Link to={`/alerts`}>
                                <div className="content" >
                                    <i className="massive circular bullhorn icon"style={{color: "white", marginTop:".5em"}}></i>
                                    <div className="ui hidden divider"></div>
                                    <h1 className="ui image header" style={styles.title}>
                                        <div className="content">
                                        Alerts
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
export default HomeTutor;







