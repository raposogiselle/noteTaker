const express = require("express");
// const uuid = require("uuid");
// const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");
const apiRoutes = require("./routes/Api-routes")
const htmlRoutes = require("./routes/html-routes")

const app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

app.listen(PORT, function () {
    console.log("listening on port")
})