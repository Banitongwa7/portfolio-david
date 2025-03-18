import React from 'react'
import Script from "next/script";

export default async function BuyMeACoffee() {
  return (
    <div>
      <Script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="dbanitongwa"
        data-description="Support me on Buy me a coffee!"
        data-message="Thanks for your support 💖"
        data-color="#40DCA5"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy='afterInteractive'
      />
    </div>
  )
}
