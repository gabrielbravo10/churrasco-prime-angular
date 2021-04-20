import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaginated } from 'src/app/shared/interfaces/IPaginated';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-provider-products-list',
  templateUrl: './provider-products-list.component.html',
  styleUrls: ['./provider-products-list.component.scss']
})
export class ProviderProductsListComponent implements OnInit {

  products: IProduct[] = [];
  searchMode: boolean = false;

  providerId: number;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.providerId = +this.route.snapshot.paramMap.get('providerId');
      this.listProducts();
    });
  }

  listProducts() {
    this.productService.findProductsByProviderAndCategory(this.providerId).subscribe((response: IPaginated<IProduct>) => {
      this.products = response.content;
    },
      (error) => {
        console.log(error);
      })
  }

}
