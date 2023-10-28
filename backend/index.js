const express = require('express')
const app = express();
const PORT = 8080;

app.use(express.json())

app.get('/tshirt', (req, res) => {

    res.status(200).send({
        tshirt: 'large'
    })

});


app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params;
    const { logo } = req.body;

    res.json(`${id} and ${logo}`);


});

app.listen(
    PORT,
    () => console.log('alive')
)

