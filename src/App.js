// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import Services from './components/auth/Services'
import ChangePassword from './components/auth/ChangePassword'
import About from './components/auth/About'
import ClientServices from './components/auth/ClientServices'

const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	// All services from db will be stored in services using state
    const [services, setServices] = useState('')
	
	useEffect(() => {
		getServices()
	}, [])

	// Axios call to my Django API to get All Services Available
    const getServices = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/services/'
			
        })
        .then(res => {
            // console.log('This is the response from the db', res.data.services)
            res = Object.values(res.data.services)
            // set services in state
            setServices(res)
        })
        .catch(err => {
            console.log('Error: ', err)
        })
    }

	


	console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route path='/services' element={<Services msgAlert={msgAlert} services={services} user={user} /> }/>
					<Route path='/about' element={<About msgAlert={msgAlert} user={user} /> }/>
					<Route path='/client-services/' element={<ClientServices msgAlert={msgAlert} user={user} /> }/>
        <Route
            path='/sign-out'
            element={
            <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
            }
        />
        <Route
            path='/change-password'
            element={
            <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>}
        />
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
