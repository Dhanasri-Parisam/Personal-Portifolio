import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

/*
    1. Header
        - Logo
        - Nav Items
    2. Body
        - Search
        - Restaurant Card
    3. Footer
        - Copyright
        - Links
        - Address
        - Contact
*/

const AppLayout = () => {
    return <div className="app">
        <Header/>
        <Outlet/>
    </div>
}

//Router Configuration
const appRouter = createBrowserRouter([
    {
        path: "/",
        element : <AppLayout/>,
        children: 
        [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurant/:resId", //: - used for dynamic routing (resId is a param which differentiates the restaurants)
                element: <RestaurantMenu/>
            },
        ],
        errorElement: <ErrorPage/>,//shows error page
    },
    
])
const root = createRoot(document.getElementById("root"));

//Providing router configuration(appRouter) to the AppLayout
root.render(<RouterProvider router={appRouter}/>);
