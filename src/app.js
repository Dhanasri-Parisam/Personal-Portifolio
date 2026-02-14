import { lazy, Suspense } from "react";
import { createRoot } from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import AboutProfile from "./components/AboutProfile";
import AuthPage from "./components/AuthPage";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

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

// chunking
// code splitting
// dynamic bundling
// lazy loading
// on demand loading

const Grocery = lazy(() => import("./components/Grocery")); 


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
                path: "/about/profile",
                element: <AboutProfile/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/auth",
                element: <AuthPage/>,
            },
            {
                path: "/grocery",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<h2>Loading grocery...</h2>}>
                            <Grocery/>
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/restaurant/:resId", //: - used for dynamic routing (resId is a param which differentiates the restaurants)
                element: (
                    <ProtectedRoute>
                        <RestaurantMenu/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRoute>
                        <Cart/>
                    </ProtectedRoute>
                ),
            },
        ],
        errorElement: <ErrorPage/>,//shows error page
    },
    
])
const root = createRoot(document.getElementById("root"));

//Providing router configuration(appRouter) to the AppLayout
root.render(
    <AuthProvider>
        <RouterProvider router={appRouter}/>
    </AuthProvider>
);
