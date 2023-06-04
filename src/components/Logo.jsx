import React from 'react'
import logo from "../assets/images/logo.png"
import { NavLink } from 'react-router-dom'

export default function Logo({ size,withText=true,text=null }) {
  return (
    <>
        <NavLink to={'/'} className='h-fit w-fit flex justify-center items-center gap-2 no-underline focus:no-underline hover:no-underline'>
            <img
                width={`${size}px`}
                height={`${size}px`}
                src={logo}
            />
            {withText && <span className='font-bold text-xl text-white'>{ text }</span>}
        </NavLink>
    </>
  )
}
