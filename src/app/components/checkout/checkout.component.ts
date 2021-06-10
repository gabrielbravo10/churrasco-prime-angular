import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { IOrderItem } from 'src/app/shared/interfaces/IOrderItem';
import { IPurchase } from 'src/app/shared/interfaces/IPurchase';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2)
        ]),
        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2)
        ]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      address: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)
      ]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)
      ]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2)
      ])
      })
    });
  }


  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get addressStreet() { return this.checkoutFormGroup.get('address.street'); }
  get addressCity() { return this.checkoutFormGroup.get('address.city'); }
  get addressZipCode() { return this.checkoutFormGroup.get('address.zipCode'); }


  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new IOrder;
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: IOrderItem[] = cartItems.map(tempCartItem => new IOrderItem(tempCartItem));

    // set up purchase
    let purchase = new IPurchase();

    // populate purchase - customer

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase -  address

    purchase.address = this.checkoutFormGroup.controls['address'].value;

    // populate purchase - order and orderItems

    purchase.order = order;
    purchase.orderItems = orderItems;

    // call Rest API via checkout service

    console.log(purchase);

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Seu pedido foi recebido com sucesso!\nNumero de rastrear do pedido: ${response.orderTrackingNumber}`)
        // reset cart
        this.resetCart();
      },
      error: err => {
        alert(`Erro: ${err.message}`);
      }
    }
    )
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/providers");
  }
}
