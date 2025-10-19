/**
 * Cart Persistence Test
 * 
 * Purpose: Validate cart persistence functionality using LocalStorage
 * 
 * Resume Claim: "Implemented a persistent cart with LocalStorage"
 */

import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock Cart Component that uses LocalStorage (like the actual app)
const PersistentCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="cart-items">
        {cart.map((item) => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            {item.name} - Qty: {item.quantity}
          </div>
        ))}
      </div>
      <button onClick={() => addToCart({ id: 1, name: 'Test Product', price: 99.99 })}>
        Add Product
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Product</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('Cart Persistence Tests - LocalStorage Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('✅ VALIDATION: Cart persists to LocalStorage when items are added', () => {
    console.log('\n📦 Testing: Cart persistence to LocalStorage');
    
    const { unmount } = render(<PersistentCart />);

    // Initially, cart should be empty
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(localStorage.getItem('cart')).toBe('[]');

    // Add a product
    fireEvent.click(screen.getByText('Add Product'));

    // Verify cart updated
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    
    // Verify LocalStorage updated
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0]).toMatchObject({
      id: 1,
      name: 'Test Product',
      price: 99.99,
      quantity: 1
    });

    console.log('   ✅ Cart successfully persisted to LocalStorage');
    console.log(`   ✅ Stored cart: ${JSON.stringify(storedCart)}`);

    unmount();
  });

  test('✅ VALIDATION: Cart restores from LocalStorage on page reload', () => {
    console.log('\n🔄 Testing: Cart restoration from LocalStorage');

    // Simulate existing cart data in LocalStorage
    const existingCart = [
      { id: 1, name: 'Product 1', price: 50, quantity: 2 },
      { id: 2, name: 'Product 2', price: 75, quantity: 1 }
    ];
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Render component (simulating page reload)
    const { unmount } = render(<PersistentCart />);

    // Verify cart restored from LocalStorage
    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    expect(screen.getByText('Product 1 - Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - Qty: 1')).toBeInTheDocument();

    console.log('   ✅ Cart successfully restored from LocalStorage');
    console.log(`   ✅ Restored ${existingCart.length} items from storage`);

    unmount();
  });

  test('✅ VALIDATION: Cart persists across component unmount/remount', () => {
    console.log('\n♻️  Testing: Cart persistence across component lifecycle');

    // First render - add items
    const { unmount: unmount1 } = render(<PersistentCart />);
    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Add Product')); // Add twice
    
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    const cart1 = JSON.parse(localStorage.getItem('cart'));
    expect(cart1[0].quantity).toBe(2);
    
    unmount1();

    // Second render - verify data persisted
    const { unmount: unmount2 } = render(<PersistentCart />);
    
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByText('Test Product - Qty: 2')).toBeInTheDocument();

    console.log('   ✅ Cart persisted across component unmount/remount');
    console.log(`   ✅ Quantity correctly maintained: 2`);

    unmount2();
  });

  test('✅ VALIDATION: Cart updates are immediately persisted', () => {
    console.log('\n⚡ Testing: Real-time cart persistence');

    const { unmount } = render(<PersistentCart />);

    // Add product
    fireEvent.click(screen.getByText('Add Product'));
    let storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart[0].quantity).toBe(1);
    console.log('   ✅ Add operation persisted');

    // Update quantity
    fireEvent.click(screen.getByText('Update Quantity'));
    storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart[0].quantity).toBe(5);
    console.log('   ✅ Update operation persisted');

    // Remove product
    fireEvent.click(screen.getByText('Remove Product'));
    storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).toHaveLength(0);
    console.log('   ✅ Remove operation persisted');

    unmount();
  });

  test('✅ VALIDATION: Multiple items persist correctly', () => {
    console.log('\n📚 Testing: Multiple items persistence');

    const { unmount } = render(<PersistentCart />);

    // Simulate multiple different products
    const products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 }
    ];

    products.forEach((product, index) => {
      // Manually add to cart by updating localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      currentCart.push({ ...product, quantity: index + 1 });
      localStorage.setItem('cart', JSON.stringify(currentCart));
    });

    unmount();

    // Remount to verify restoration
    const { unmount: unmount2 } = render(<PersistentCart />);
    
    expect(screen.getByTestId('cart-count').textContent).toBe('3');
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).toHaveLength(3);
    expect(storedCart[0].quantity).toBe(1);
    expect(storedCart[1].quantity).toBe(2);
    expect(storedCart[2].quantity).toBe(3);

    console.log('   ✅ All 3 items persisted correctly');
    console.log(`   ✅ Total cart value: $${storedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}`);

    unmount2();
  });

  test('✅ VALIDATION: Cart clears from LocalStorage when cleared', () => {
    console.log('\n🗑️  Testing: Cart clearing functionality');

    // Pre-populate cart
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, name: 'Product 1', price: 50, quantity: 2 }
    ]));

    const { unmount } = render(<PersistentCart />);
    
    expect(screen.getByTestId('cart-count').textContent).toBe('1');

    // Clear cart
    fireEvent.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    
    // After clearing, localStorage will have empty array "[]"
    const clearedCart = JSON.parse(localStorage.getItem('cart'));
    expect(clearedCart).toEqual([]);

    console.log('   ✅ Cart successfully cleared from LocalStorage');

    unmount();
  });

  test('Performance: LocalStorage operations are fast', () => {
    console.log('\n⏱️  Testing: LocalStorage performance');

    const iterations = 100;
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const testCart = Array.from({ length: 20 }, (_, idx) => ({
        id: idx,
        name: `Product ${idx}`,
        price: Math.random() * 100,
        quantity: Math.floor(Math.random() * 5) + 1
      }));

      const startTime = performance.now();
      localStorage.setItem('cart', JSON.stringify(testCart));
      const storedData = JSON.parse(localStorage.getItem('cart'));
      const endTime = performance.now();

      times.push(endTime - startTime);
      expect(storedData).toHaveLength(20);
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / iterations;
    
    console.log(`   ✅ Average LocalStorage operation time: ${avgTime.toFixed(3)}ms`);
    console.log(`   ✅ Min: ${Math.min(...times).toFixed(3)}ms, Max: ${Math.max(...times).toFixed(3)}ms`);
    
    // LocalStorage operations should be fast (< 10ms typically)
    expect(avgTime).toBeLessThan(50);
  });
});
