// Import dependencies

// Methods

const getApiInfo = (req,res) => {
    
    console.log("The root route has been called!");        

    return res.status(200).json({
        project: "Daily Planner",
        status: "API running",
        author: "Alejandro Diaz"
    });    
};

const testEndpoint = (req,res) => {
    
    console.log("My test endpoint has been executed!");

    return res.status(200).send(`
        <section>
            <h1>Daily Planner App</h1>
            <h2>First steps</h2>
            <p>This is a route</p>
        </section>
    `);
};

// Export the controllers
module.exports = {
    getApiInfo,
    testEndpoint
};