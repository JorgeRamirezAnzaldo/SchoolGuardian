import React from "react";


const Login = () => {
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            marginTop:"1em"
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
    }
  return (
    <>
        <div className="ui hidden divider"style={{padding: "1em"}}></div>
        <div className="ui two column center aligned grid padded" style={{marginTop: "200px;"}}>
            <div className="column"style={{maxWidth: "750px", marginTop: "200px; "}}>
                    <img className="ui center aligned" src="./Images/08-01-23-010832.png" alt=""></img>
                    <div className="ui hidden divider"style={{margin:"0 1em"}}></div>
                    <h1 className="ui image header" style={{color: "white",marginBottom: "1.2em",  fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"}}>
                        <div className="content">
                        School Guardian
                        </div>
                    </h1>
            <form className="ui form center aligned">
                <div className="ui fluid left icon input ">
                    <input type="text" placeholder="School"></input>
                    <i className="building icon"></i>
                </div>
                <div className="ui fluid left icon input" style={{marginTop:" 2em;"}}>
                    <input type="text" placeholder="Email"></input>
                    <i className="envelope icon"></i>
                </div>
                <div className="ui fluid left icon input" style={{marginTop: "2em;"}}>
                    <input type="text" placeholder="Password"></input>
                    <i className="lock icon"></i>
                </div>
                <div className="ui fluid large teal submit button" style={styles.background}>Login</div>
                
            </form>
            </div>
        </div>
    </>
  );
};

export default Login;