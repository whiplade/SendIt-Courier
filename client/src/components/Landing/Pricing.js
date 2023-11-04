import React from 'react'
import NavBar from '../../NavBar'

export default function Pricing() {
  return (
    <>
    <NavBar />
    <div className='compheading'>Pricing</div>
    <div className="pricingcard">
      <div className="pricing-card">
      <div className="pricing-header">
        <div>
          <h2 className="title">Package</h2>
          <p className="description">Suitable to grow steadily.</p>
          <p className="description">Delivery.Available</p>
        </div>
        <div className="price">
          <p>
            <span className="price-value">$25</span>
            <span className="price-suffix"> /Kg </span>
          </p>
        </div>
      </div>
      <div className="pricing-footer">
        <a
          aria-describedby="tier-company"
          className="cta-button"
          href="/signin"
        >
          Get started
        </a>
      </div>
    </div>
    <div className="pricing-card">
      <div className="pricing-header">
        <div>
          <h2 className="title">Letter</h2>
          <p className="description">Suitable to grow steadily.</p>
          <p className="description">Delivery.Available</p>
        </div>
        <div className="price">
          <p>
            <span className="price-value">$5</span>
            <span className="price-suffix"> /g </span>
          </p>
        </div>
      </div>
      <div className="pricing-footer">
        <a
          aria-describedby="tier-company"
          className="cta-button"
          href="/signin"
        >
          Get started
        </a>
      </div>
    </div>
    <div className="pricing-card">
      <div className="pricing-header">
        <div>
          <h2 className="title">Delivery</h2>
          <p className="description">Suitable to grow steadily.</p>
          <p className="description">Yourarea.Available</p>
        </div>
        <div className="price">
          <p>
            <span className="price-value">$10</span>
            <span className="price-suffix"> /item </span>
          </p>
        </div>
      </div>
      <div className="pricing-footer">
        <a
          aria-describedby="tier-company"
          className="cta-button"
          href="/signin"
        >
          Get started
        </a>
      </div>
    </div>
    </div>
    </>
  );
}
