import express from "express";
import exec from "child_process";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import path from "path";

const app = express();
const port = 3000;

const __dirname = path.resolve();

const client = new EC2Client({region: 'us-east-1'});

app.use(express.static(path.join(__dirname + '/../site/')));

async function sendCommand(command, req, res)
{
    const data = await client.send(command);

    res.send(data);
}

app.get('/awsdata', (req, res) => {
    try {
        const command = new DescribeInstancesCommand({});
        sendCommand(command, req, res);
    } catch (error) {
        console.log(error, error.stack);
    } 
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../site/index.html'));
});

app.post('/', function (req, res) {
    res.send('Thanks for the POST!');
    console.log("We got a POST request, boys.");
    exec('systemd-cat ansible-playbook ../provision.yml');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});