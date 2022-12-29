const admin = require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./service_key_from_firebase_console.json");

app.use(express.json())

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// app.post('/send-noti', (req, res) => {

//     console.log(req.body)

    const message = {
        data: {
            title: 'title1',
            body: 'body text'
        },
        token: 'fsuaupNfRAiES9qRuYbZE1:APA91bEPhq-Erq0snC_u6DQx6zcur8zTaLn70bj_T-Qu2RbiOWBszw9qEAgkZYF3VRL9r0YTaFlVm3Ws0FnKyG2ltWrpQDDRFrdHjckFqP-g1tClC_4ucMlnexhuawgQFBne52wtkGvc'
    }
    admin.messaging().send(message).then(res => {
        console.log('successfully')
    }).catch(err => {
        console.log(err)
    })

// })

// app.listen(3000, () => {
//     console.log('server running')
// })