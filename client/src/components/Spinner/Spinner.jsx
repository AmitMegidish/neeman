import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => (
    <div className="h-75 d-flex align-items-center">
        <div className={classes.loader}>Loading...</div>
    </div>
)

export default Spinner
