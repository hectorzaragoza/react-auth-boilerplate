// Index of Services are being fed as props to the Services Component from App.js
// App.js holds the axios call to the Django API

function Services(props) {

    const allServices = Object.values(props.services).map((s, i) => {
        return (
            <>
            <h2 key={i}>{s.name}</h2>
            <h3>${s.price}</h3>            
            </>
        )
    })

    return (
        <>
        <h1>These are all the services we offer: </h1>
        <div>{allServices}</div>
        <a href="/checkout-services">Hire our services</a>
        </>
    )
}

export default Services