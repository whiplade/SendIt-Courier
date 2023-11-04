import React from 'react';
import NavUser from './NavUser';

function Delivery() {
  return (
    <div class="">
    <NavUser />
    <div className="subscribe">
      <p>SENDPACKAGE</p>
      <input
        placeholder="Your e-mail"
        className="subscribe-input"
        name="email"
        type="email"
      />
      <br />
      <div className="submit-btn">SUBMIT</div>
    </div>
    <div class="card-conteiner">
  <div class="card-content">
    <div class="card-title">Price <span>Range</span></div>
    <div class="values">
      <div>$<span id="first">735</span></div> -
      <div>$<span id="second">6 465</span></div>
    </div>
    <small class="current-range">
      Current Range:
      <div>$<span id="third">7 200</span></div>
    </small>
    <div data-range="#third" data-value-1="#second" data-value-0="#first" class="slider">
      <label class="label-min-value">1</label>
      <label class="label-max-value">10 000</label>
    </div>
  </div>
</div>
    </div>
  );
}

export default Delivery;
