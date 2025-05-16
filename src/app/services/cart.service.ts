import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartFromStorage());
  cartItems$ = this.cartItems.asObservable();

  private getCartFromStorage(): any[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  private updateCart(cart: any[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    this.cartItems.next(cart);
  }

  addToCart(product: any): void {
    let cart = this.getCartFromStorage();
    const index = cart.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.getCartFromStorage().filter(
      (item) => item.id !== productId
    );
    this.updateCart(cart);
  }

  updateQuantity(productId: number, change: number): void {
    let cart = this.getCartFromStorage();
    const index = cart.findIndex((item) => item.id === productId);

    if (index !== -1) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      this.updateCart(cart);
    }
  }
}
