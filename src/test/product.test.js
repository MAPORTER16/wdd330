/**
 * @jest-environment jsdom
 */

import { setLocalStorage, getLocalStorage } from "../js/utils.mjs";

describe("Shopping Cart LocalStorage Tests", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("setLocalStorage should store data in localStorage", () => {
    const testData = { id: "123", name: "Test Product" };
    setLocalStorage("test-key", testData);

    const stored = localStorage.getItem("test-key");
    expect(stored).toBe(JSON.stringify(testData));
  });

  test("getLocalStorage should retrieve data from localStorage", () => {
    const testData = { id: "456", name: "Another Product" };
    localStorage.setItem("test-key", JSON.stringify(testData));

    const retrieved = getLocalStorage("test-key");
    expect(retrieved).toEqual(testData);
  });

  test("getLocalStorage should return null for non-existent key", () => {
    const retrieved = getLocalStorage("non-existent");
    expect(retrieved).toBeNull();
  });

  test("shopping cart should store multiple items as an array", () => {
    const cart = [
      { Id: "880RR", Name: "Rimrock 2", quantity: 1 },
      { Id: "989CG", Name: "Ajax 3", quantity: 2 },
    ];

    setLocalStorage("so-cart", cart);
    const retrieved = getLocalStorage("so-cart");

    expect(Array.isArray(retrieved)).toBe(true);
    expect(retrieved.length).toBe(2);
    expect(retrieved[0].Id).toBe("880RR");
    expect(retrieved[1].quantity).toBe(2);
  });

  test("adding items to cart should not overwrite existing items", () => {
    // Simulate adding first item
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push({ Id: "880RR", Name: "Rimrock 2", quantity: 1 });
    setLocalStorage("so-cart", cartItems);

    // Simulate adding second item
    cartItems = getLocalStorage("so-cart") || [];
    cartItems.push({ Id: "989CG", Name: "Ajax 3", quantity: 1 });
    setLocalStorage("so-cart", cartItems);

    // Verify both items exist
    const finalCart = getLocalStorage("so-cart");
    expect(finalCart.length).toBe(2);
    expect(finalCart[0].Id).toBe("880RR");
    expect(finalCart[1].Id).toBe("989CG");
  });
});
