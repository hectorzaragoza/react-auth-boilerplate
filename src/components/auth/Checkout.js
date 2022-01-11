// This will hold the Stripe API code and receive from App.js all the services as props
// Users will use a checkbox to select which services to add to their cart which will update the 
// Stripe "Cart" for checkout
import { API_URL } from '../../config';
import { useEffect} from 'react'

function Checkout(props) {
    // This is boilerplate from Stripe:
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log("I'm inside the Checkout")
    
        if (query.get("success")) {
            console.log("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
            console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
        }
    }, []);

    // props.services holds all of our services
    // I will need to loop through the services available and create a list
    // with checkboxes

    // The checkbox will set the state that will be used to update the cart
    // of desired items that will then be shipped to Stripe API

    const allServices = Object.values(props.services).map((s, i) => {
        return (
            <>
            <h2>{s.name}</h2>
            <h3>${s.price}</h3>
            <input type="checkbox"></input>            
            </>
        )
    })

    return (
        <section>
    <div className="product">
        {allServices}
    </div>
    <form action={`${API_URL}/checkout/`} method="POST">
        <button type="submit">
            Checkout
        </button>
    </form>
    </section>
    )
}

export default Checkout