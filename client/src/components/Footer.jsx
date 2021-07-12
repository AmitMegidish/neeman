import React from 'react'
import { Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-auto footer">
            <Col className='text-center'>
                <p className="mb-0">
                    - Copyright &copy; Neeman 2021 -
                </p>
                <p className="mb-0">
                    Built by Lior & Amit
                </p>
            </Col>
        </footer>
    );
};

export default Footer;
