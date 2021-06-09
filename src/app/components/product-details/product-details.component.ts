import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICartItem } from 'src/app/shared/interfaces/ICartItem';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  theProviderId: number = +this.route.snapshot.paramMap.get('providerId');

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    
    console.log(this.theProviderId);
    this.productService.findById(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new ICartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }

}
