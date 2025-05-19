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
    this.cartservice.cartItems$.subscribe((p) => {
      this.cartItems = p;
    });
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.discount = 0;
    this.total = this.subtotal - this.discount;
  }

  increaseQty(item: any): void {
    this.cartservice.updateQuantity(item.id, 1);
    const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = updatedCart;
    this.calculateTotals();
  }

  decreaseQty(item: any): void {
    this.cartservice.updateQuantity(item.id, -1);
    const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = updatedCart;
    this.calculateTotals();
  }

  removeItem(item: any): void {
    this.cartservice.removeFromCart(item.id);
  }

  buyNow(): void {
    console.log('Cart Data:', this.cartItems);
    console.log('Subtotal:', this.subtotal);
    console.log('Discount:', this.discount);
    console.log('Total:', this.total);
  }
}
