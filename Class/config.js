const config = {
    "cortex" : {
        "socketUrl" : 'wss://localhost:6868',
        "user" : {//info api cree sur : https://www.emotiv.com/my-account/cortex-apps/
            "clientId":"l2PKZzfjiaNeViM48P2ei37iybrgj8h1i5ROajkR",
            "clientSecret":"PmgFBidEkOkrwseyOnTaRnSUZr5ifwFRC9R9q2MC9r7J8wSe8LdFaGAdjxD8bP4t9bvAjzRiU3NWYYS37bY7hM7yVcRC45mx042tmGvSGZqqOoYqqvEjk10OPV5ygSiT",
            "debit":2
        }
    },

    "serial":{
        "port": "COM5",
        "vitesse": 9600
    }
}

module.exports = config;