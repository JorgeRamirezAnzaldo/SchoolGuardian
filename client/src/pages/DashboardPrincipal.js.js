import React, { useState } from "react";
import { Icon } from 'semantic-ui-react';

//import { useMutation } from '@apollo/client';
//import { LOGIN_USER } from '../utils/mutations';

const DashboardPrincipal = () => {

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
            fontFamily:"Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        button: {
            background:"rgb(94,3,222)",
            background:"radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)",
            color: "white"
        }
    }
  return (
        
    <>  
        <div className="ui hidden divider"style={{padding: "1em"}}></div>
        <div className="ui two column center aligned grid padded" style={{marginTop: "200px"}}>
            <div className="column"style={{maxWidth: "750px", marginTop: "200px "}}>
                <i className="ui center aligned big circular bullhorn icon"style={{color: "white", marginTop:".5em"}}></i>
                <div className="ui hidden divider"style={{margin:"0 1em"}}></div>
                <h1 className="ui image header" style={{color: "white",marginBottom: "1.2em",  fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
                    <div className="content">
                        Create Alert
                    </div>
                </h1>
                <form className="ui form center aligned" onSubmit={handleFormSubmit}>
                    <div className="ui fluid input" style={{marginTop:" 2em"}}>
                        <input type="text" placeholder="Subject" name="Subject" ></input>
                    </div>
                    <div className="ui fluid  input" style={{marginTop: "2em"}}>
                        <input type="text" placeholder="Message" name="Message" ></input>
                    </div>
                        <button className="ui fluid large teal submit button" style={styles.background}
                        type="submit"
                        >
                        Submit
                        </button>
                </form>
            </div>
        </div>
    </>
  );
};

export default DashboardPrincipal;