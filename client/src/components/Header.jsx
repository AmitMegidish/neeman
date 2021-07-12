import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { userLogout } from '../store/actions/userActions'

const Header = () => {

    const dispatch = useDispatch()
    const { activeUser } = useSelector(state => state.user)

    const navLogout = activeUser && <Button variant="danger" className="logout-button" onClick={() => dispatch(userLogout())}>התנתק</Button>

    return (
        <header className="header">
            <Navbar bg="primary" variant="dark" sticky="top">
                <Nav className="mr-auto">
                    {navLogout}
                </Nav>
                {activeUser && <span className="text-light font-weight-bold mr-auto">{activeUser.name}</span>}
                <img
                    src="/images/Logo.png"
                    width="80"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Neeman logo"
                />
            </Navbar>
        </header>
    );
};

export default Header;