import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app.routes"; // ✅ Import only routes
import { UserProvider } from "./context/user.context";
import { ProductProvider } from "./context/product.context";
import { OrderProvider } from "./context/order.context";
import { CartProvider } from "./context/cart.context";

const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <BrowserRouter> 
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
