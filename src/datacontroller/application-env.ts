//const _ = require('lodash');
var application = ["app1", "app2", "app3", "app4", "app5", "app6"];


export function getApps () {
    console.log("inside getApps function");
    return application;
}

export function addApps (appName: string) {
    application.push(appName);
    return application;
}

export function getApp(appName: string) {
    console.log(application.find(element => element.includes(appName)));
    return application.find(element => element.includes(appName));
}

export function deleteApp(appName: string) {
    const index = application.indexOf(appName);
    if (index > -1) {
        application.splice(index, 1);    
    }
    return application;
    
}

