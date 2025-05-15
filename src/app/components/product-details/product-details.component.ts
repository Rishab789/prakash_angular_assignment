import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  id: number = 0;
  productDetails: any;

  constructor(private activatedroute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params['id'];

    this.productDetails = data.find((item) => item.id == this.id);
  }
}
