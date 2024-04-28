const client = require("../middleware/commercetools");

// fetching carts by customerId -complete
async function fetchCartDetails(customerId) {
  try {
    const response = await client.execute({
      method: "GET",
      uri: `/repurpose/carts/customer-id=${customerId}`,
    });
    console.log("service", response);
    return response.body;
  } catch (error) {
    console.error("Error fetching customers cart details:", error.name);
    return error;
  }
}

// updating line items in customer carts- not complete
async function updateCart(cartId, productId,variantId) {
  try {
    const response = await client.execute({
      method: "POST",
      uri: `/repurpose/carts/${cartId}`,
      body: { productId,variantId },
    });
    console.log("service", response);
    return true;
  } catch (error) {
    // console.error("Cart Error:", error);
    return false;
  }
}

// create cart
async function createCart(customerId) {
  try {
    const newCart = await client.execute({
      method: "POST",
      uri: "/repurpose/carts",
      body: { currency: "INR", customerId },
    });
    console.log("new cart updated", newCart);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchCartDetails,
  updateCart,
  createCart,
};

// if (error.name === "NotFound") {
//   // create new cart for that customer
//   try{
//     const newCart = await client.execute({
//       method: "POST",
//       uri : '/repurpose/carts',
//       body : {currency: "INR", customerId},
//     })
//     console.log("new cart updated",newCart)
//   }
//   catch(error){
//     console.log(error)
//   }
// }
