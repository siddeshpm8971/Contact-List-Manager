import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className='navbar navbar-dark bg-dark navbar-expand-sm p-3'>
                <Link to={'/'} className="navbar-brand">
                    <i className='fa fa-phone h3 text-success'></i> <span className='h2'>Contact App</span>
                </Link>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;