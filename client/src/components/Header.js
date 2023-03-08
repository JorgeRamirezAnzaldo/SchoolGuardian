import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


const Header = () => {
    let user;
    if (Auth.loggedIn()){
        user = Auth.getProfile();
    }
    console.log(user);



  return (
        <header className="ui equal width padded grid">
            {Auth.loggedIn() ? (
                <div className="row" style={{padding: '1.5em'}}>
                        <div className=" column">
                            <h1 className="ui left aligned image header" style={{color: 'white'}}>
                                <div className="ui left aligned content ">
                                    {user.data.name}
                                <i className="big user icon size" style={{color: 'rgb(94,3,222)'}}></i>
                                </div>
                            </h1>
                        </div>
                        <div className="ui right aligned column">
                            <h1 className="padded image header" style={{color: 'white'}}>
                                <div className="padded content">
                                School Guardian
                                <i className="shield alternate icon big" style={{width: '40px', color:'rgb(94,3,222)'}}></i>
                                <i className="sign-out icon big" style={{width: '40px', color:'rgb(94,3,222)', marginLeft:'0.5em'}}></i>
                                </div>
                                
                                
                                
                            </h1>
                        </div>
                </div>
            ):(<>
            </>)}
        </header>
  );
};

export default Header;
