import React, { Suspense } from 'react'
import LoadingBox from '../common/LoadingBox'
import ContainerBox from '../common/ContainerBox'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function RootLayout() {
  const location = useLocation();
  const isAuthPage = ["/",""]?.includes(location?.pathname) 
  return (
    <>
        <div className='w-full h-screen bg-white flex flex-col'>
            {
              isAuthPage && 
              (<div className='w-full h-[6%]'>
                <Navbar />
              </div>)
            }
            <div className={`w-full ${isAuthPage ? "h-[94%]" : "h-full"}`}>
              <Suspense fallback={<LoadingBox />}>
                <ContainerBox>
                  <Outlet />
                </ContainerBox>
              </Suspense>
            </div>
        </div>
    </>
  )
}
