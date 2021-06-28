import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICity } from 'src/app/shared/interfaces/ICity';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { IOrderItem } from 'src/app/shared/interfaces/IOrderItem';
import { IPaginated } from 'src/app/shared/interfaces/IPaginated';
import { IPurchase } from 'src/app/shared/interfaces/IPurchase';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { CityService } from 'src/app/shared/services/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  cities: ICity[] = [];

  storage: Storage = sessionStorage;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();
    this.getCities();

    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        cpf: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        telefone: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11)
        ]),
        email: new FormControl(theEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('',
          [Validators.required,
          Validators.minLength(6)
        ]),
      }),
      address: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        streetNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        neighborhood: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        complement: new FormControl(''),
      }),
    });
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );

    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  get cpf() {
    return this.checkoutFormGroup.get('customer.cpf');
  }
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get telefone() {
    return this.checkoutFormGroup.get('customer.telefone');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  get password() {
    return this.checkoutFormGroup.get('customer.password');
  }

  get addressStreet() {
    return this.checkoutFormGroup.get('address.street');
  }
  get addressStreetNumber() {
    return this.checkoutFormGroup.get('address.streetNumber');
  }
  get addressNeighborhood() {
    return this.checkoutFormGroup.get('address.neighborhood');
  }
  get addressCity() {
    return this.checkoutFormGroup.get('address.city');
  }
  get addressZipCode() {
    return this.checkoutFormGroup.get('address.zipCode');
  }
  get addressComplement() {
    return this.checkoutFormGroup.get('address.complement');
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new IOrder();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: IOrderItem[] = cartItems.map(
      (tempCartItem) => new IOrderItem(tempCartItem)
    );

    // set up purchase
    let purchase = new IPurchase();

    // populate purchase - customer

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase -  address

    purchase.address = this.checkoutFormGroup.controls['address'].value;
    purchase.address.city = this.checkoutFormGroup.get('address.city').value.substring(0, 1); 

    // populate purchase - order and orderItems

    purchase.order = order;
    purchase.orderItems = orderItems;

    // call Rest API via checkout service

    console.log(purchase);

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        // Swal.fire('Seu pedido foi recebido com sucesso!', `Numero de rastrear do pedido: ${response.orderTrackingNumber} - \nPedido chegara em torno de 35 minutos.. caso preciso 
        // entregador ligara no telefone cadastrado..`, 'success');
        Swal.fire({
          icon: 'success',
          title: 'Seu pedido foi recebido com sucesso!',
          text: 'Pedido chegara em torno de 35 minutos.. caso preciso entregador ligara no telefone cadastrado..',
          footer: `Codigo para reastreamento do pedido: ${response.orderTrackingNumber}`
        })
        // reset cart
        this.resetCart();
      },
      error: (err) => {
        Swal.fire('Oops!', 'Occoreu algum erro!', 'error');
      },
    });
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/providers');
  }

  getCities() {
    this.cityService.findAll().subscribe(
      (response: IPaginated<ICity>) => {
        this.cities = response.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
