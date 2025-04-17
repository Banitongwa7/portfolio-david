import React from 'react'
import CardTool from '@/components/alltools/CardTool'

export default function Tools() {
  return (
    <div>
        <h2 className='text-center text-3xl font-bold text-white mt-10'>All tools here</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:w-[80%] justify-items-center mx-auto mt-10'>
            <CardTool />
            <CardTool />
            <CardTool />
            <CardTool />
            <CardTool />
            <CardTool />
            <CardTool />
        </div>
    </div>
  )
}
