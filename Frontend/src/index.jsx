import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import { SingupPage } from './Pages/SingUp/signup.jsx'
import { CartPage } from './Pages/Cart/cart.jsx'
import { PlaceorderPage } from './Pages/PlaceOrder/placeOrder.jsx'
import { MyordersPage } from './Pages/myOreders/myOrders.jsx'
import ContextProvider from './Components/Context/context.jsx'

const root = createRoot(document.getElementById('root'));
const allRoutes = createBrowserRouter([{
  path: "/",
  element: <App />
},
{
  path: "/signup",
  element: <SingupPage />
},
{
  path: "/cart",
  element: <CartPage />
},
{
  path: "/order/place",
  element: <PlaceorderPage />
},
{
  path: "/order/address",
  element: <PlaceorderPage />
},
{
  path: "/user/orders",
  element: <MyordersPage />
}
]);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={allRoutes} />
    </ContextProvider>
  </React.StrictMode>
)
