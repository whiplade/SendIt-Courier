/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const services = [
  {
    name: "Express Delivery",
    description:
      "Swift and secure parcel delivery service. Trust us to get your packages delivered with speed and reliability.",
    image: 'https://images.pexels.com/photos/3754686/pexels-photo-3754686.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: "Local Drop-offs",
    description:
      "Send your parcels locally hassle-free. We provide convenient doorstep delivery services within your city.",
    image: 'https://images.pexels.com/photos/6170100/pexels-photo-6170100.jpeg?auto=compress&cs=tinysrgb&w=150', 
  },
  {
    name: "Shop-to-Door Delivery",
    description:
      "Shop from your favorite stores, and we'll deliver your purchases right to your doorstep. Enjoy the ease of shopping from home.",
    image: 'https://media.istockphoto.com/id/1292443598/photo/flying-shopping-cart-with-shopping-bags-on-a-pink-background.jpg?b=1&s=612x612&w=0&k=20&c=JeNDINymdPXtkYuDt9sE2N_xLA93toXmHSq-hQI9KWc=', 
  },
  {
    name: "Global Shipping",
    description:
      "Ship your items worldwide with our efficient global delivery services. We connect continents with reliable shipping solutions.",
    image: 'https://images.pexels.com/photos/1236421/pexels-photo-1236421.jpeg?auto=compress&cs=tinysrgb&w=150', 
  },
];

export default function Services() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simplifying Your Deliveries
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our range of delivery services designed to meet your diverse needs. Your satisfaction is our priority.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            {services.map((service) => (
              <div key={service.name} className="relative">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                      src={service.image}
                      alt={`${service.name} Image`}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {service.description}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
