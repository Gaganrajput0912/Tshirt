import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to add a product
  const handleAddProduct = () => {
    const updatedProducts = [...products];
    const productIndex = updatedProducts.findIndex(
      (p) => p.name === newProduct.name && p.size === newProduct.size
    );
    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity += 1;
    } else {
      updatedProducts.push({ ...newProduct, quantity: 1 });
    }
    setProducts(updatedProducts);
    setNewProduct({});
  };

  // Function to add product to cart
  const handleAddToCart = (product) => {
    const index = products.findIndex(
      (p) => p.name === product.name && p.size === product.size
    );
    if (index >= 0) {
      const updatedProduct = {
        ...products[index],
        quantity: products[index].quantity - 1,
      };
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1, updatedProduct);
      setProducts(updatedProducts);
    }
    setCart([...cart, { ...product, quantity: (product.quantity || 0) + 1 }]);
    setTotalPrice(totalPrice + Number(product.price));
  };

  // Function to remove product from cart
  const handleRemoveFromCart = (index) => {
    const product = cart[index];
    const updatedCart = [...cart];
    if (product.quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
    setTotalPrice(totalPrice - Number(product.price));
  };

  return (
    <div>
      <h1>T-Shirt Shop</h1>
      <input
        type="text"
        placeholder="Enter T-Shirt name"
        value={newProduct.name || ""}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter T-Shirt description"
        value={newProduct.description || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Enter T-Shirt price"
        value={newProduct.price || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <select
        value={newProduct.size || ""}
        onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
      >
        <option value="">Select size</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="S">S</option>
      </select>
      <button onClick={handleAddProduct}>Add product</button>
      <hr />
      <h2>Products</h2>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Size: {product.size}</p>
          <p>Quantity: {product.quantity || 0}</p>
          <button onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>
      ))}
      <hr />

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.size}</p>
              <button onClick={() => handleRemoveFromCart(index)}>
                Remove from cart
              </button>
            </div>
          ))}
          <p>Total price: {totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default App;
