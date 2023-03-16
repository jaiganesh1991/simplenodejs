//import functions
import * as appenvs from './datacontroller/application-env.js'
import express from 'express';
import bodyParser from 'body-parser';

//Initialise Express
const app = express();
app.use(express.json());
//app.use(bodyParser.json());

app.get("/apps",(_req: any, res: { statusCode: number; write: (arg0: string) => void; end: () => void; }) => {

    res.statusCode = 200;
    console.log("inside /apps method");
    res.write(JSON.stringify(appenvs.getApps()));
    res.end();

});

app.post("/app",(req: any, res: { statusCode: number; write: (arg0: string) => void; end: () => void; }) => {

    var appName = "";
    var data = req.body;
    console.log(data);
    appName = data.appName;
    //console.log(appName);
    var appFind = appenvs.getApp(appName);
    console.log(appFind);
    res.write(appFind);
    res.end();

});

app.post("/addApp",(req, res :{ statusCode: number; write: (arg0: string) => void; end: () => void; }) => {
    var appName = "";
    var data = req.body;
    appName = data.appName;
    appenvs.addApps(appName);
    res.write(JSON.stringify(appenvs.getApps()));
    res.end();

});

app.post("/deleteApp",(req, res :{ statusCode: number; write: (arg0: string) => void; end: () => void; }) => {
    var appName = "";
    var data = req.body;
    appName = data.appName;
    appenvs.deleteApp(appName);
    res.write(JSON.stringify(appenvs.getApps()));
    res.end();
    
});


app.listen(4000, () => {
    console.log("Listening on 4000")
});
