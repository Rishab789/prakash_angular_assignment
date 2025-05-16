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

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
