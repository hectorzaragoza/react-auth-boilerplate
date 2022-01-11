// About page is a static page to display the team members bios and pictures
// Stretch goal: Use the Calendly API here to integrate scheduling consults

function About(props) {

    return (
        <>
        <h1>Who we are:</h1>
        <h2>Team will be displayed here</h2>
        <br/>
        <h4>Stretch Goal: Calendly API</h4>
        <form action="https://formsubmit.co/zaragoza09@gmail.com" method="POST">
            <input type="text" name="name" required></input>
            <input type="email" name="email" required></input>
            <button type="submit">Send</button>
        </form>
        </>
    )
}

export default About