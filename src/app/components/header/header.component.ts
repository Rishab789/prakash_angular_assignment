import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  itemLength: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.itemLength = items.length;
    });
  }

  // updateCartCount(cart: any[]) {
  //   console.log('clalling');
  //   this.itemLength = cart.reduce((acc, item) => acc + item.quantity, 0);
  // }
}
