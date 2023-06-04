import React, { lazy } from 'react'
import { createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';

export default function Routes() {
  const wait = (time) => {
    return new Promise(resolve => {
      setTimeout(resolve,time)
    })
  }
    const Pages = {
        Authentication : lazy(() => wait(1000).then(() => import('./pages/Authentication'))),
        Dashboard : lazy(() => wait(1000).then(() => import('./pages/Dashboard')))
    }
  const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Pages.Authentication />} /> 
            <Route path='dashboard' element={<Pages.Dashboard />} /> 
        </Route>
    )
  )

  return routes;
}
