const express = require("express");
const router = express.Router();

const usersRoute = require('./users.route')
const authRoute = require("./auth.route");

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
];

routesIndex.forEach((route)=>{
    router.use(route.path, route.route)
})



module.exports = router;
