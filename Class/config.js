const config = {
    "cortex" : {
        "socketUrl" : 'wss://localhost:6868',
        "user" : {//info api cree sur : https://www.emotiv.com/my-account/cortex-apps/
            "clientId":"yourKey",
            "clientSecret":"yourKey",
            "debit":2
        }
    },

    "serial":{
        "port": "COM5",
        "vitesse": 9600
    }
}

module.exports = config;