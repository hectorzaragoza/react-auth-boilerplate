import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// import messages from '../shared/AutoDismissAlert/messages'

// Index of Services are being fed as props to the Services Component from App.js
// App.js holds the axios call to the Django API

function Services(props) {

    const allServices = Object.values(props.services).map((s, i) => {
        return (
            <>
            <h2>{s.name}</h2>
            <h3>${s.price}</h3>            
            </>
        )
    })

    return (
        <>
        <h1>These are all the services we offer: </h1>
        <div>{allServices}</div>
        </>
    )
}

export default Services