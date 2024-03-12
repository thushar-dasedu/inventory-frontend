import React from 'react';
import './Nav.css'
import Button from 'react-bootstrap/Button';
 

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> {props.title}</a>
                 
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <form className="d-flex flex-grow-1 justify-content-end"> 
                    
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button> 
                        
 
                    </form> */}
                     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                     <Button variant="primary"><i class="ri-user-2-fill"></i></Button>{' '}
                </div>
 
             </div>
        </nav>
    );
};

export default Navbar;
