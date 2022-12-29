import React, { useEffect, useState } from "react";
import { serverKey } from "../apiKeys/keys";
import messaging from '@react-native-firebase/messaging'
import { ToastAndroid } from "react-native";

const PushNotificationSingleDevice = (title, body, image, data, token) => {


    const toast = text => ToastAndroid.show(text, ToastAndroid.SHORT)

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `key=${serverKey}`);

    var raw = JSON.stringify({
        "notification": {
            "body": body,
            "title": title,
            "image": image
        },
        "to": 'fsuaupNfRAiES9qRuYbZE1:APA91bEPhq-Erq0snC_u6DQx6zcur8zTaLn70bj_T-Qu2RbiOWBszw9qEAgkZYF3VRL9r0YTaFlVm3Ws0FnKyG2ltWrpQDDRFrdHjckFqP-g1tClC_4ucMlnexhuawgQFBne52wtkGvc'
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response =>
            // response.text()
            console.log('object', response)
            )
    // .then(result => {console.log('from pushnotification result', result)})
    // .catch(error => console.log('from pushnotification error', error));

}



// working
export const TestNotifications = (token) => {

    // var myHeaders = new Headers();
    // // myHeaders.append("Cache-Control", "no-cache, no-store, must-revalidate");
    // // myHeaders.append("Pragma", "no-cache");
    // // myHeaders.append("Expires", "0");
    // myHeaders.append("cache", "default");
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `key=${serverKey}`);

    let myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `key=${serverKey}`
    }

    var raw = JSON.stringify({
        "notification": {
            "body": "This is a test notification",
            "title": "Title",
            // "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI_Ay7AMI2aA7gAiTB9SVQaL2FY_X6StzYIGb8aDok&s",
            // "color": "#ffooff",
            // "image": 'https://firebasestorage.googleapis.com/v0/b/rnfirebaseguide1.appspot.com/o/Users%2F111?alt=media&token=2c098d1b-f6bf-4a86-88ce-ea1ac890b193',
        },
        "to": 'fsuaupNfRAiES9qRuYbZE1:APA91bEPhq-Erq0snC_u6DQx6zcur8zTaLn70bj_T-Qu2RbiOWBszw9qEAgkZYF3VRL9r0YTaFlVm3Ws0FnKyG2ltWrpQDDRFrdHjckFqP-g1tClC_4ucMlnexhuawgQFBne52wtkGvc'
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        // .then(result => console.log('from pushnotification result', result))
        // .catch(error => console.log('from pushnotification error', error));

}

export default PushNotificationSingleDevice