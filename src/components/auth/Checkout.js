// This will hold the Stripe API code and receive from App.js all the services as props
// Users will use a checkbox to select which services to add to their cart which will update the 
// Stripe "Cart" for checkout
import { API_URL } from '../../config';
import { useEffect, useState } from 'react'
import axios from 'axios';

function Checkout(props) {
    // This is boilerplate from Stripe:
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log("I'm inside the Checkout")
        console.log('These are my props: ', props)
    
        if (query.get("success")) {
            console.log("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
            console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
        }
    }, []);

    // I will store user selection in this state
    // const [checkedState, setCheckedState] = useState(new Array(props.services.length).fill(false))
    const [userServices, setUserServices] = useState([])

    // Axios Call to Django API with user selected services as payload
    const handleSubmit = (e) => {
        const stripeProducts = [
            {'Leadership Training':
                    {
                        'price': 'price_1KGlJ1HRuIv0fDSuFPIp3Frq',
                        'quantity': 1,
                    }
            },
            {'Personal Coaching':
                    {
                        'price': 'price_1KGlIlHRuIv0fDSuilPnZcyV',
                        'quantity': 1,
                    }
            }
            ]
        
        const filterObjsInArr = (arr, selection) => {
            const filteredArray = [];
            arr.map((obj) => {
                const filteredObj = {};
                for (let key in obj) {
                if (selection.includes(key)) {
                    filteredObj[key] = obj[key];
                };
                };
                filteredArray.push(filteredObj);
            })
            return filteredArray;
            }

        const newArr = filterObjsInArr(stripeProducts, userServices)

        const newNewArr = JSON.stringify(newArr)
        console.log('Did this work? ', JSON.stringify(newArr))

        axios({
            method: 'post',
            url: 'http://localhost:8000/checkout/',
            data: {
                'userServices': newNewArr,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token a131d5969cda498a7a88cc4920f25f3b37b3d549`,
                'Cookie': 'csrftoken=sxKQX9lRFAu9qyLFtOnZXt1rjsv8sp4feiu0tn724ej83YKAuAkr6EqnXVuMgis3; sessionid=g2p32chdupzl1zvejmdt0gvwn3d0rcou'
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    // props.services holds all of our services
    // I will need to loop through the services available and create a list
    // with checkboxes
    // The checkbox will set the state that will be used to update the cart
    // of desired items that will then be routed to Stripe API Checkout Session

    // Handle Check Box; The desired data is in e.target.value
    const handleChange = (e) => {
        console.log('THis is the checkox clicked: ', e.target.value)
        const service = e.target.value
        const serviceArr = userServices
        if (e.target.checked) {
            serviceArr.push(service)
        } else if (serviceArr.includes(service)) {
            serviceArr.splice(serviceArr.indexOf(service), 1)
        }
        setUserServices(serviceArr)
        console.log('These are user services on change: ', userServices)
    }

    const allServices = Object.values(props.services).map((s, index) => {
        return (
            <>
            <h2 key={index}>{s.name}</h2>
            <h3>${s.price}</h3>
            <label><input type="checkbox" onClick={handleChange} value={s.name} name={s.name}/>Checkbox</label>            
            </>
        )
    })

    return (
        <section>
    <div className="product">
        {allServices}
    </div>
    <form action="http://localhost:8000/checkout/" onSubmit={handleSubmit} method="POST">
        <button value="Checkout">Checkout</button>
    </form>
    </section>
    )
}

export default Checkout