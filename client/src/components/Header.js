import React from 'react';


const Header = () => {
  
  return (
    <>
     <header className="ui equal width padded grid">
         <div className="ui equal width padded grid">
            <div className="row" style={{padding: '1.5em'}}>
                    <div className=" column">
                        <h1 className="ui left aligned image header" style={{color: 'white'}}>
                            <div className="ui left aligned content ">
                            Leonardo N
                            <i className="big users icon size" style={{color: 'rgb(94,3,222)',
                            color: 'radial-gradient(circle, rgba(94,3,222,1) 0%, rgba(8,7,7,1) 100%)'}}></i>
                            </div>
                        </h1>
                    </div>
                    <div className="ui right aligned column">
                        <h1 className="padded image header" style={{color: 'white'}}>
                            <div className="padded content">
                            School Guardian
                            <i className="shield alternate icon" style={{width: '40px'}}></i>
                            </div>
                        </h1>
                    </div>
            </div>
        </div>
    </header>
    </>
   
  );
};

export default Header;
