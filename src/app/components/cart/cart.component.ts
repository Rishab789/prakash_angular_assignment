import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    const cartData = localStorage.getItem('cartItems');
    this.cartItems = cartData ? JSON.parse(cartData) : [];

    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.discount = 0; // Add logic if discount applies
    this.total = this.subtotal - this.discount;
  }

  // For future features:
  increaseQty(item: any): void {
    item.quantity++;
    this.updateCart();
  }

  decreaseQty(item: any): void {
    const index = this.cartItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity--;

      if (this.cartItems[index].quantity < 1) {
        this.cartItems.splice(index, 1); // Remove from array
      }

      this.updateCart();
    }
  }

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
    this.cartservice.removeFromCart(item.id);
    this.updateCart();
  }

  updateCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotals();
  }

  buyNow(): void {
    console.log('Cart Data:', this.cartItems);
    console.log('Subtotal:', this.subtotal);
    console.log('Discount:', this.discount);
    console.log('Total:', this.total);
  }
}
