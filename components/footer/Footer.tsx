import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full py-4 flex items-center justify-center text-[#9CA3AF] text-[14px] font-[400]'>
        <p>{new Date().getFullYear()} Portfolio by David B.</p>
    </footer>
  )
}
