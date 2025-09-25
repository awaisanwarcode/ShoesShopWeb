import { createRoot } from 'react-dom/client'
import "./App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddItemsPage } from './Pages/AddItem/AddItems.jsx';
import { OrdersPage } from './Pages/Orders/orders.jsx';
import { AllItemsPage } from './Pages/AllItems/Allitems.jsx';

let allroutes = createBrowserRouter([{
  path: "/",
  element: <AddItemsPage />
},
{
  path: "/Admin/Orders",
  element: <OrdersPage />
},
{
  path: "/Admin/Items/All",
  element: <AllItemsPage />
}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={allroutes}></RouterProvider>
)
