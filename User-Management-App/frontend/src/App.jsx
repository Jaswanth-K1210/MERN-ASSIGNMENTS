import React from 'react'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import Home from './components/home'
import RouteLayout from './components/RouteLayout'
import { createBrowserRouter,RouterProvider } from 'react-router'

function App() {
  const router = createBrowserRouter([
    {

      path:'/',
      element:<RouteLayout />,
      children:[
    
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/userlist",
      element: <UserList />
    },
    {
      path: "/usercard/:id",
      element: <UserCard />
    }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
//const users = [
  //   { id: 1, name: 'John Doe', email: 'hauh@gmaail.com', dateOfBirth: '1990-01-01', mobileNumber: '1234567890' },
  //  { id: 2, name: 'Jane Doe', email: 'jane@example.com', dateOfBirth: '1992-05-15', mobileNumber: '0987654321' }
  // ];