import express from "express";
import proc from "child_process";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import path from "path";
import nodemailer from "nodemailer";
import mysql from "mysql";
import dotenv from "dotenv";

const dot = dotenv.config();

const app = express();
const port = 5000;

const __dirname = path.resolve();

const client = new EC2Client({region: 'us-east-1'});

let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

connection.connect();

app.use(express.static(path.join(__dirname + '/site/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/site/index.html'));
});

app.post('/subscribe/email/:email', function (req, res) {
    let transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });

    let email = req.params['email'];

    transporter.sendMail({
        from: 'srv@pondero.org',
        to: email,
        subject: 'Hello, world!',
        text: 'This is a test email until I get my fortunes together!'
    }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
        console.log(info.response);
    });

    res.send('Subscribed!');
});

async function sendCommand(command, req, res)
{
    try {
        const data = await client.send(command);
        res.send(data);
    } catch (error) {
        console.log(error, error.stack);
    } finally {
    }
}

app.get('/get/tty', (req, res) => {
    res.sendFile(path.join(__dirname + '/url/link'));
});

app.get('/get/instances', (req, res) => {
    try {
        const command = new DescribeInstancesCommand({});
        sendCommand(command, req, res);
    } catch (error) {
        console.log(error, error.stack);
    } finally {

    }
});

app.get('/get/ip', (req, res) => {

});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
});

