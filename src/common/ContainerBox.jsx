import React from 'react'

export default function ContainerBox({ children }) {
  return (
    <>
        <section className='max-w-7xl mx-auto w-full h-full'>
          { children }
        </section>
    </>
  )
}
