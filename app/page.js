'use client'; // Enables client-side rendering

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div>
      <h1>Web3 Food System</h1>
      <h2>Menu</h2>
      <button onClick={() => addItemToCart('Burger')}>Add Burger</button>
      <button onClick={() => addItemToCart('Pizza')}>Add Pizza</button>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Link href="/payment">Proceed to Payment</Link>
    </div>
  );
}
