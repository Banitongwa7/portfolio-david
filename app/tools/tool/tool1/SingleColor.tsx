"use client"
import React, { useState, useEffect } from 'react'

interface SingleColorProps {
  rgb: [number, number, number]
  weight: number
  index: number
  hexColor: string
}



export default function SingleColor({ rgb, weight, index, hexColor }: SingleColorProps) {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(',')
  const hexValue = `#${hexColor}`

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hexValue)
      setAlert(true)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <article
      className={`p-4 rounded-md cursor-pointer ${index > 10 ? 'text-gray-200' : 'text-gray-800'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={handleCopyToClipboard}
    >
      <p className="text-lg font-medium mb-2">{weight}%</p>
      <p className="text-base mb-2">{hexValue}</p>
      {alert && (
        <p className="text-sm font-medium animate-fade-in-out">
          copied to clipboard
        </p>
      )}
    </article>
  )
}