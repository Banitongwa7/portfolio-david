import React from 'react'

export default function Title(props) {

  return (
    <div className='container w-full text-center'>
    <h2 className='title font-bold text-[50px]'>{props.title}</h2>
    <div className='description font-medium'>
        <p>{props.description}</p>
    </div>
    </div>
  )
}
