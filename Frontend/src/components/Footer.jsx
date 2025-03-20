import React from 'react'

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AffiliateAdda. All rights reserved.</p>
          <p>Follow us on social media:
            <a href="/" className="text-blue-400 ml-2">Facebook</a> |
            <a href="/" className="text-blue-400 ml-2">Instagram</a> |
            <a href="/" className="text-blue-400 ml-2">Twitter</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer