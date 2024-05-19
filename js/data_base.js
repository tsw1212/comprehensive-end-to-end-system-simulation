
const DB = {

    getUser: function (user,password) {
        let users =JSON.parse(localStorage.getItem('users'));
        console.log(users);
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === user&&users[i].password===password) {
                return users[i];
            }
        }
        throw "user not found";
    },

    getProduct: function (currentUser, productName) {
        let allProudct = JSON.parse(localStorage.getItem(currentUser))
        for (let i = 0; i < allProudct.length; i++) {
            if (allProudct[i].name === productName) {
                return allProudct[i];
            }
        }
        //לבדוק שגיאות כתיב 
        throw "product not found"
    },

    getlistProduct: function (currentUser) {
        let currentDuobt = JSON.parse(localStorage.getItem(currentUser));
        let list = []
        currentDuobt.forEach(element => {
            list.push(element);
        })
        return list;
    },

    addUser: function (user) {
        let users = [];
        users = JSON.parse(localStorage.getItem('users'));
        for (let i = 0; i < localStorage.getItem('numberOfUsers'); i++) {
            if (users[i].email === user.email) {
                throw "exsisting user";
            }
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        let numberOfUsers = localStorage.getItem('numberOfUsers');
        numberOfUsers++;
        localStorage.setItem('numberOfUsers', numberOfUsers);
        localStorage.setItem(user.email, '[]')

    },

    addProduct: function (currentUser, product) {
        let allProudct = JSON.parse(localStorage.getItem(currentUser));
        for (let i = 0; i < allProudct.length; i++) {
            if (allProudct[i].name === product.name) {
                throw "exsisting product"
            }
        }
        product.sku = product.QuntityInWerehouse+ product.price ;
        allProudct.push(product);
        localStorage.setItem(currentUser, JSON.stringify(allProudct))
    },

    deleteProduct: function (currentUser, product) {
        let allProudct = JSON.parse(localStorage.getItem(currentUser));
        for (let i = 0; i < allProudct.length; i++) {
            if (allProudct[i].name === product) {
                allProudct.splice(i, 1);
                localStorage.setItem(currentUser, JSON.stringify(allProudct))
                return;
            }

        }

    },
    putProduct: function (currentUser, product, detailes) {
        let allProudct = JSON.parse(localStorage.getItem(currentUser));
        for (let i = 0; i < allProudct.length; i++) {
            if (allProudct[i].name === product) {
                allProudct[i].QuntityInWerehouse = detailes;
                localStorage.setItem(currentUser, JSON.stringify(allProudct))
                return;
            }

        }
    }
    ,
}
