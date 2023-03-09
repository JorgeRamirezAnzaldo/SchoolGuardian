//Import react and necessary hooks/components from react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';
//Import Auth methods
import Auth from '../utils/auth';

//Define Header function
const Header = () => {
    let user;

     //Validate if user is logged in
    if (Auth.loggedIn()){
        user = Auth.getProfile(); //Get profile of the user which is logged in
    }

    //Return all necessary elements to build the header
    return (
        <header className="ui equal width padded grid">
            {Auth.loggedIn() ? (
                <div className="row" style={{padding: '1.5em'}}>
                        <div className=" column">
                            <h1 className="ui left aligned image header" style={{color: 'white'}}>
                                <div className="ui left aligned content ">
                                    {user.data.name}/ {user.data.usertype}
                                <i className="big user icon size" style={{color: 'rgb(94,3,222)'}}></i>
                                </div>
                            </h1>
                        </div>
                        <div className="ui right aligned column">
                            <h1 className="padded image header" style={{color: 'white'}}>
                                <div className="padded content">
                                School Guardian
                                <i className="shield alternate icon big" style={{width: '40px', color:'rgb(94,3,222)'}}></i>
                                </div>
                                <div className="padded content" style={{marginTop: '10px'}}>
                                <Link to={`/Home`}>
                                    <i className="home icon big" style={{width: '40px', color:'white', marginLeft:'0.5em'}}></i>
                                </Link>
                                <i className="sign-out icon big" style={{width: '40px', color:'white', marginLeft:'0.5em'}} onClick={Auth.logout}></i>
                                </div>
                            </h1>
                        </div>
                </div>
            ):(<>
            </>)}
        </header>
  );
};

//Export Header page
export default Header;
