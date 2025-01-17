const express = require("express");
const axios = require("axios");
const cors = require("cors")

const bodyParser = require("body-parser");

// accessing .env content
const dotenv = require("dotenv");
dotenv.config();

// importing controllers
const productController = require("./src/controller/productsController");
const customerController = require("./src/controller/customerController");
const cartController = require("./src/controller/cartController");
const loginController = require("./src/controller/loginController");

const app = express();
const PORT = 5000;
// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }


// using body parser
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());

// Enable CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });


// route handler for login - authenticate customer
app.post("/login", loginController.authenticateUser);

// Route handler for fetching products
app.get("/products", productController.getProducts);

// Route handler for fetching customers
app.get("/customers", customerController.getCustomers);

// Route handler for adding customers
app.post("/customers", customerController.addCustomer);

// Route handler for fetching cart details - not complete
app.get("/carts", cartController.getCartDetails);

// Route handler for updating items cart details - not complete
app.post("/carts", cartController.updateCartDetails);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
