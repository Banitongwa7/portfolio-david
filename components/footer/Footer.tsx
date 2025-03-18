import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full py-4 flex flex-col items-center justify-center gap-5 text-[#9CA3AF] text-[14px] font-[400]'>
        <p>{new Date().getFullYear()} Portfolio by David B.</p>
    </footer>
  )
}
