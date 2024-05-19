
let myRequst;

const myServer = {

    //לבדוק עם לשולח לsend
    treatRequst: function (Requst) {
        myRequst = Requst;
        FAPI.initializeValues();
        if (Requst.f_method == "GET") {
            FAPI.fGET();
            return;
        }
        if (Requst.f_method == "POST") {
            FAPI.fPOST();
            return;
        }
        if (Requst.f_method == "PUT") {
            FAPI.fPUT();
            return;
        }
        if (Requst.f_method == "DELETE") {
            FAPI.fDELETE();
            return;
        }

    },

}

const FAPI = {
    "currentUser": "",
    "index": "",
    "protocal": "",
    initializeValues: function () {
        FAPI.index = myRequst.f_url.search(/\?/);
        FAPI.protocal = (myRequst.f_url).slice(FAPI.index + 1, (myRequst.f_url).length + 1);
    },
    fGET: function () {
        if (/user/.test(FAPI.protocal) && FAPI.protocal.match(/user/).index == 0) {
            let user = FAPI.protocal.slice(5, FAPI.protocal.length);
            try {
                myRequst.f_responseText = DB.getUser(user,myRequst.f_body);
                myRequst.f_responseText=  JSON.stringify(myRequst.f_responseText);
                console.log(myRequst.f_responseText);
                myRequst.f_status = 200;
            }
            catch (msg) {
                myRequst.f_status = 480;
                myRequst.f_statusMasage = msg;
            }
        } else if (checkUser(FAPI.protocal)) {
            let products = /products\//;
            let product = /product\//;
            console.log(products.test(FAPI.protocal));
            if (products.test(FAPI.protocal) && FAPI.protocal.match(products).index == FAPI.currentUser.length + 1) {
                try {
                    myRequst.f_responseText = DB.getlistProduct(FAPI.currentUser);
                    myRequst.f_responseText=  JSON.stringify(myRequst.f_responseText);
                    myRequst.f_status = 200;
                }
                catch (msg) {
                    myRequst.f_status = 410;
                    myRequst.f_statusMasage = msg;
                }

            }
            if (product.test(FAPI.protocal) && FAPI.protocal.match(product).index == FAPI.currentUser.length + 1) {

                let startName = /product\/.*$/;
                let startproductName = FAPI.protocal.match(startName);
                let productName = FAPI.protocal.slice(startproductName.index + 8, FAPI.protocal.length);
                try {
                    myRequst.f_responseText = (DB.getProduct(FAPI.currentUser, productName));
                    myRequst.f_responseText=  JSON.stringify(myRequst.f_responseText);
                    myRequst.f_status = 200;
                }
                catch (msg) {
                    myRequst.f_status = 410;
                    myRequst.f_statusMasage = msg;
                }
                console.log(myRequst.f_responseText);
            }
        } else {
            myRequst.f_status = 404;
            myRequst.f_statusMasage = "page not found";
        }
    },
    fPOST: function () {
        console.log(FAPI.protocal);
        if (/user/.test(FAPI.protocal) && FAPI.protocal.match(/user/).index === 0) {
            try {
                DB.addUser(myRequst.f_body);
                myRequst.f_status = 200;
            }
            catch (msg) {
                myRequst.f_status = 420;
                myRequst.f_statusMasage = msg;
            }
        } else if (checkUser(FAPI.protocal)) {
            try {
                DB.addProduct(FAPI.currentUser, myRequst.f_body);
                myRequst.f_status = 200;
            }
            catch (msg) {
                myRequst.f_status = 420;
                myRequst.f_statusMasage = msg;
            }

        } else {
            myRequst.f_status = 404;
            myRequst.f_statusMasage = "page not found";
        }


    },
    fPUT: function () {
        if (checkUser(FAPI.protocal)) {
            let product = /product\//;
            console.log(product.test(FAPI.protocal));
            if (product.test(FAPI.protocal) && FAPI.protocal.match(product).index == FAPI.currentUser.length + 1) {

                let startName = /product\/.*$/;
                let startproductName = FAPI.protocal.match(startName);
                let productName = FAPI.protocal.slice(startproductName.index + 8, FAPI.protocal.length);
                try {
                    myRequst.f_responseText = DB.putProduct(FAPI.currentUser, productName, myRequst.f_body);
                    myRequst.f_responseText=  JSON.stringify(myRequst.f_responseText);
                    myRequst.f_status = 200;
                }
                catch (msg) {
                    myRequst.f_status = 410;
                    myRequst.f_statusMasage = msg;
                }
                console.log(myRequst.f_responseText);
            }
        }

    },
    fDELETE: function () {
        if (checkUser(FAPI.protocal)) {
            let product = /product\//;
            if (product.test(FAPI.protocal) && FAPI.protocal.match(product).index == FAPI.currentUser.length + 1) {
                let startName = /product\/.*$/;
                let startproductName = FAPI.protocal.match(startName);
                let productName = FAPI.protocal.slice(startproductName.index + 8, FAPI.protocal.length);
                try {
                    myRequst.f_responseText = (DB.deleteProduct(FAPI.currentUser, productName));
                    myRequst.f_responseText=  JSON.stringify(myRequst.f_responseText);
                    myRequst.f_status = 200;
                }
                catch (msg) {
                    myRequst.f_status = 410;
                    myRequst.f_statusMasage = msg;
                }
            }
        }
    },
}

function checkUser(protocal) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    FAPI.currentUser = currentUser.email;
    if (protocal.match(FAPI.currentUser).index == 0) {
        return true;
    }
    return false;
}