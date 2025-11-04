"use client"
import React, { useState, useEffect } from 'react'
import Values from 'values.js'

interface ColorValue {
  rgb: [number, number, number]
  weight: number
  hex: string
}

interface SingleColorProps {
  rgb: [number, number, number]
  weight: number
  index: number
  hexColor: string
}

export default function ColorGenerator() {
  const [color, setColor] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [list, setList] = useState<ColorValue[]>(() => {
    try {
      return new Values('#f15025').all(10)
    } catch (error) {
      console.error('Error initializing colors:', error)
      return []
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    if (!color) {
      setError(true)
      return
    }

    try {
      const colors = new Values(color).all(10)
      setList(colors)
      setError(false)
    } catch (error) {
      setError(true)
      console.error('Error generating colors:', error)
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    if (error) setError(false)
  }

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Color Generator
        </h3>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
          Generate a palette of colors based on a hex value.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
          <input
            type="text"
            value={color}
            onChange={handleColorChange}
            placeholder="#f15025"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400
              ${error 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'border-gray-300 dark:border-gray-600'
              }`}
            aria-label="Color hex value"
          />
          <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              dark:bg-blue-600 dark:hover:bg-blue-700
              transition-colors duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!color}
          >
            Submit
          </button>
        </form>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 
        dark:bg-gray-900">
        {list.map((color, index) => (
          <SingleColor
            key={index}
            rgb={color.rgb}
            weight={color.weight}
            index={index}
            hexColor={color.hex}
          />
        ))}
      </section>
    </>
  )
}



function SingleColor({ rgb, weight, index, hexColor }: SingleColorProps) {
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