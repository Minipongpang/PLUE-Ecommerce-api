require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/not-found");
const authRoute = require("./routes/auth-Route");
const postRoute = require("./routes/createPost-Route");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const productRouter = require("./routes/product-Route");
const orderRoute = require("./routes/order-Route");
const adminRoute = require("./routes/admin-Route");
const app = express();
app.use(cors({}));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/createPost", authenticate, postRoute);
app.use("/product", productRouter);
app.use("/order", authenticate, orderRoute);
app.use("/admin", adminRoute);

//รับหาไม่เจอ
app.use(notFound);

//รับerror
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("server is running on", port));
