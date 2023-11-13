import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Experience Seamless and Lightning-Fast Deliveries!</h2>
            <p className="text-lg">
              At our courier company, we're not just delivering packages; we're delivering excitement and efficiency. With a passion for making your deliveries seamless and lightning-fast, we redefine the art of courier services.
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-lg">
              Reach out to us for a delivery experience like never before. Our team is dedicated to providing top-notch services.
            </p>
            <p className="mt-2">
              <strong>Address:</strong> 123 Express Lane, Speedy City
            </p>
            <p>
              <strong>Email:</strong> info@speedydeliveries.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) SPEEDY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
