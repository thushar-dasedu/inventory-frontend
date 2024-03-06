import React from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ background: 'rgb(95, 91, 91)', height: '10vh', color: 'white' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> {props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto"> {/* Align form to the right using ms-auto */}
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit" style={{ background: 'black', color: 'white' }}>Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
