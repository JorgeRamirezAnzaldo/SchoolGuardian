import React from 'react';


const Header = ({username}) => {
  
  return (
    <>
     <header className="ui equal width padded grid">
         
            <div className="row" style={{padding: '1.5em'}}>
                    <div className=" column">
                        <h1 className="ui left aligned image header" style={{color: 'white'}}>
                            <div className="ui left aligned content ">
                                {username}
                            <i className="big users icon size" style={{color: 'rgb(94,3,222)'}}></i>
                            </div>
                        </h1>
                    </div>
                    <div className="ui right aligned column">
                        <h1 className="padded image header" style={{color: 'white'}}>
                            <div className="padded content">
                            School Guardian
                            <i className="shield alternate icon big" style={{width: '40px', color:'rgb(94,3,222)'}}></i>
                            </div>
                        </h1>
                    </div>
            </div>
        
    </header>
    </>
   
  );
};

export default Header;
