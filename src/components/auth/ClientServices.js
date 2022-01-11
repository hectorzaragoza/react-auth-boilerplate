// Client Services will display the services that belong to the user
import { useEffect, useState } from 'react'
import axios from 'axios'


function ClientServices(props) {

    // User purchased services
	const [userServices, setUserServices] = useState('')

    useEffect(() => {
		getUserServices()
	}, [])

    const getUserServices = () => {
		axios({
			method: 'GET',
			url: 'http://localhost:8000/client/',
			headers: {
				'Authorization': `token ${props.user.token}`
			}
		})
		.then(res => {
			console.log('This is the Db Response for user owned services: ', res.data.services)
            res = Object.values(res.data.services)
            setUserServices(res)
		})
		.catch(err => {
			console.log('Oops!', err)
		})
	}

    const clientServices = Object.values(userServices).map((s, i) => {
        return (
            <>
            <h2>{s.name}</h2>
            <h3>${s.price}</h3>            
            </>
        )
    })

    return (
        <>
        <h1>You've Purchased: </h1>
        <div>{clientServices}</div>
        </>
    )
}

export default ClientServices