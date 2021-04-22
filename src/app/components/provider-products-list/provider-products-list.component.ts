import { ICategoryProducts } from './../../shared/interfaces/ICategoryProducts';
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
  categories: ICategoryProducts[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.providerId = +this.route.snapshot.paramMap.get('providerId');
      this.listProducts();
    });
  }

  listProducts(categories?: string, filter?: string) {
    this.productService.findProductsByProviderAndCategory(this.providerId, categories, filter).subscribe((response: IPaginated<IProduct>) => {
      this.products = response.content;
      this.productsListToCategoryProductsList();
    },
      (error) => {
        console.log(error);
      })
  }

  onCategoryChange(category: string) {
    console.log(category);
    if (category === '0') {
      this.listProducts();
    } else {
      this.listProducts(category);
    }
  }

  onSearchChange(keyword: string) {
    console.log(keyword);
    this.listProducts('', keyword);
  }

  productsListToCategoryProductsList() {

    this.products.map(product => {

      const index = this.categories.findIndex(category => category.idCategory === product.categories[0].idCategory)
      if (index === -1) {
        this.categories.push({
          ...product.categories[0],
          products: [product]
        })
      } else {
        this.categories[index].products.push(product);
      }
    })
  }

}
