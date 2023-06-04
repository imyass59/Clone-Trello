import { CircularProgress } from '@mui/material'
import React from 'react'

export default function LoadingBox() {
  return (
    <>
        <div className='flex justify-center items-center w-full h-full  bg-[#EEEEEE]'>
            <CircularProgress style={{
                color : "#0092CA"
            }}/>
        </div>
    </>
  )
}
