import React from 'react'

export default function ComingSoon() {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage:
          "url(https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg)",
      }}
    >
      <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
            <span className="text-xl lg:text-2xl xl:text-3xl font-bold">
              Hey ! It&#39;s David 😊
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl xl:text-6xl text-white tracking-wider font-bold font-serif mt-12 text-center">
          My Portfolio is coming Soon
          </h1>
        </div>
      </div>
    </div>
  )
}
