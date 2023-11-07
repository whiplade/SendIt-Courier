import React from 'react';

export default function Pricing() {
  const weightClasses = [
    { name: "Class 1", weightRange: { min: 1, max: 10 }, price: 500 },
    { name: "Class 2", weightRange: { min: 11, max: 50 }, price: 1000 },
    { name: "Class 3", weightRange: { min: 51, max: 100 }, price: 2000 },
    { name: "Class 4", weightRange: { min: 101, max: 200 }, price: 3000 },
    { name: "Class 5", weightRange: { min: 201, max: 500 }, price: 4000 },
    { name: "Class 6", weightRange: { min: 501, max: 1000 }, price: 5000 },
    { name: "Class 7", weightRange: { min: 1001, max: 2000 }, price: 6000 },
    { name: "Class 8", weightRange: { min: 2001, max: 3000 }, price: 7000 },
    { name: "Class 9", weightRange: { min: 3001, max: 4000 }, price: 8000 },
    { name: "Class 10", weightRange: { min: 4001, max: 5000 }, price: 9000 },
    { name: "Class 11", weightRange: { min: 5001, max: 6000 }, price: 10000 },
    { name: "Class 12", weightRange: { min: 6001, max: 7000 }, price: 11000 },
    { name: "Class 13", weightRange: { min: 7001, max: 8000 }, price: 12000 },
    { name: "Class 14", weightRange: { min: 8001, max: 9000 }, price: 13000 },
    { name: "Class 15", weightRange: { min: 9001, max: 10000 }, price: 14000 },
  ];

  return (
    <div>
      <div className="compheading">Pricing</div>
      <div className="pricingcard">
        {weightClasses.map((weightClass, index) => (
          <div className="pricing-card" key={index}>
            <div className="pricing-header">
              <div>
                <h2 className="title">{weightClass.name}</h2>
                <p className="description">Weight Range: {weightClass.weightRange.min} - {weightClass.weightRange.max} Kg</p>
                <p className="description">Delivery Available</p>
              </div>
              <div className="price">
                <p>
                  <span className="price-value">Ksh{weightClass.price}</span>
                  <span className="price-suffix"> / Kg</span>
                </p>
              </div>
            </div>
            <div className="pricing-footer">
              <a
                aria-describedby={`tier-Ksh{weightClass.name}`}
                className="cta-button"
                href="/signin"
              >
                Get started
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
