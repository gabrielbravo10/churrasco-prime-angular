import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/shared/interfaces/ICartItem';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: ICartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: ICartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: ICartItem) {
    this.cartService.remove(theCartItem);
  }
}
