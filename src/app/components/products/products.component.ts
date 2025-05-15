import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { data } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];

  route = inject(Router);

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = data;
  }

  navigateToProductDetails(id: number) {
    console.log('nav calld');
    this.route.navigate(['productdetails/' + id]);
  }

  // addToCart(item: any): void {
  //   console.log('add to cart called');
  //   const cartKey = 'cartItems';

  //   // Get existing cart items or initialize as empty array
  //   const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

  //   // Check if the item is already in the cart (optional)
  //   const existingItemIndex = existingCart.findIndex(
  //     (cartItem: any) => cartItem.id === item.id
  //   );

  //   if (existingItemIndex !== -1) {
  //     // If item already in cart, you can increase quantity
  //     existingCart[existingItemIndex].quantity += 1;
  //   } else {
  //     // Add new item with quantity
  //     const cartItem = { ...item, quantity: 1 };
  //     existingCart.push(cartItem);
  //   }

  //   // Save back to localStorage
  //   localStorage.setItem(cartKey, JSON.stringify(existingCart));

  //   console.log('Cart updated:', existingCart);
  // }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
