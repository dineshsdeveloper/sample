const express = require("express");
const route = express.Router()
const { userRegister,userLogin,userOrders, getUserOrders} = require("../controllers/userController");
const path = require("path");

// routes
route.route("/user/usersignup").post(userRegister)
route.route("/user/userlogin").post(userLogin)
route.route('/user/orders').post(userOrders)
route.route('/user/getuserorders').post(getUserOrders)


// exports
module.exports = route;
