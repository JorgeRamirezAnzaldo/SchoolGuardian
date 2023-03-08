//Import react and necessary hooks/components from react-router-dom
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
//Import elements from semantic-ui-react
import { Modal, Button} from 'semantic-ui-react';
//Import useMutation hook from @apollo/client
import { useMutation } from '@apollo/client';
//Import LOGIN_USER mutation
import { LOGIN_USER } from '../utils/mutations';
//Import Auth methods
import Auth from '../utils/auth';

//Define Login function
const Login = () => {
    //Define state variable for the login form data
    const [userFormData, setUserFormData] = useState({email: "", password: ""});
    //Use mutation LOGIN_USER to login
    const [login, {error, data}] = useMutation(LOGIN_USER);
    //Define state variable to control modal opening/closing
    const [open, setOpen] = useState(false);

    //Function to handle input changes in login form
    const handleInputChange = (event) => {
        const { name, value} = event.target; //Get the name and value of the input field changed
        setUserFormData({ ...userFormData, [name]: value}); //Set the form data state with the new value
    }

    //Function to handle the form submission to login
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            //Login to application using the form data
            const { loading, data } = await login ({
                variables: { ...userFormData }
            })
            //Use the proper auth method to perform login using the returned token
            Auth.login(data.login.token);
            
        } catch (err) { //Catch any possible error
            console.error(err); //Display error
            setOpen(true); //Set Modal state to open
        }
        //Clean input fields of the form
        setUserFormData({
            email: '',
            password: ''
        })
        
    }

    //Define styles for page
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

    //Return all necessary elements with login form
    return (
    <>  
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>Error at Login</Modal.Header>
            <Modal.Content>
                <p>Wrong credentials! Check your user data</p>
            </Modal.Content>
            <Modal.Actions>
                <Button style={styles.button} onClick={() => setOpen(false)}>
                Try again
                </Button>
            </Modal.Actions>
        </Modal>
        {Auth.loggedIn() ?
        
        (<Navigate to="/Home"/>):(
        <>
        <div className="ui hidden divider"style={{padding: "1em"}}></div>
        <div className="ui two column center aligned grid padded" style={{marginTop: "200px"}}>
            <div className="column"style={{maxWidth: "750px", marginTop: "200px "}}>
                    <img className="ui center aligned" src="./Images/08-01-23-010832.png" alt="MissingImage"></img>
                    <div className="ui hidden divider"style={{margin:"0 1em"}}></div>
                    <h1 className="ui image header" style={{color: "white",marginBottom: "1.2em",  fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
                        <div className="content">
                        School Guardian
                        </div>
                    </h1>
            <form className="ui form center aligned" onSubmit={handleFormSubmit}>
                <div className="ui fluid left icon input" style={{marginTop:" 2em"}}>
                    <input type="text" placeholder="Email" name="email" onChange={handleInputChange} value={userFormData.email}></input>
                    <i className="envelope icon"></i>
                </div>
                <div className="ui fluid left icon input" style={{marginTop: "2em"}}>
                    <input type="password" placeholder="Password" name="password" onChange={handleInputChange} value={userFormData.password}></input>
                    <i className="lock icon"></i>
                </div>
                
                    <button className="ui fluid large teal submit button" style={styles.background}
                    type="submit"
                    >
                    Submit
                    </button>
            </form>
            </div>
        </div>
        </>)}
    </>
  );
};

//Export Login page
export default Login;