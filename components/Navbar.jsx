import React from 'react'

export default function Navbar() {



  return (
    <header className='w-full px-[10%]'>
        <div className="logo">
            <a href="#">David.</a>
        </div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="mainicon">
            <div className="menu">
                <i className="bi bi-list"></i>
            </div>
        </label>
        <nav>
            <a href="#">Home</a>
            <a href="#">Project</a>
            <a href="#">Skills</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
    </header>
  )
}
