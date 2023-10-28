import express from "express";
import helmet from "helmet";
import serverless from "serverless-http";

const app = express();
const PORT = 8080;

app.use(helmet());
app.use(express.json());

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'LARGE'
    });
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;
    res.json(`${id} and ${logo}`);
});

// app.listen(PORT, () => console.log('Server is alive on port ' + PORT));


export const handler = serverless(app)