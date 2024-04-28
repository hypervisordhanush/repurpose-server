const cartService = require("../services/cartService");

const updateCartItems = require("../services/cartService");

const createCart = require("../services/cartService");

// get cart details of customer
async function getCartDetails(req, res) {
  try {
    // const customerId = req.body.customerId
    // shruti - b0f941a0-ffa1-436f-80ae-78560562620c
    // Mohammad - 110bf316-c276-4b36-a036-2e8657cb85f6
    const customerId = "b0f941a0-ffa1-436f-80ae-78560562620c";
    const cartdetails = await cartService.fetchCartDetails(customerId);
    res.json(cartdetails);
    console.log("from controller", cartdetails.name);
  } catch (error) {
    console.log("errrrrrr", error);
    res.status(500).json({ error: "Nothing in cart", error });
  }
}

// update cart details of customer
async function updateCartDetails(req, res) {
  const customerId = req.body.customerId;
  const productId = req.body.productId;
  const variantId = req.body.variantId;
  console.log(req.body)
  try {
    const cartData = await cartService.fetchCartDetails(customerId);

    // If cart is not found, create a new cart
    if (!cartData) {
      await cartService.createCart(customerId);
    }

    // Get updated cart details after creating cart
    const updatedCartData = await cartService.fetchCartDetails(customerId);
    const cartId = updatedCartData.id;

    // Update cart with new product
    await cartService.updateCart(cartId, productId,variantId);

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error updating cart details:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while updating cart details" });
  }
}

module.exports = {
  getCartDetails,
  updateCartDetails,
};
