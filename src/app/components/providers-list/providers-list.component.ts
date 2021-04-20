import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProvider } from 'src/app/shared/interfaces/IProvider';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IPaginated } from '../../shared/interfaces/IPaginated';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {

  providers: IProvider[] = [];
  searchMode: boolean = false;

  constructor(private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProviders();
    });
  }

  listProviders() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProviders();
    }
    else {
      this.handleListProviders();
    }
  }

  handleSearchProviders() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    this.providerService.findAll(theKeyword).subscribe((response: IPaginated<IProvider>) => {
      this.providers = response.content;
    },
      (error) => {
        console.log(error);
      })
  }

  handleListProviders() {
    this.providerService.findAll().subscribe((response: IPaginated<IProvider>) => {
      this.providers = response.content;
    },
      (error) => {
        console.log(error);
      })
  }

  navigateToProviderPage(providerId: string) {
    this.router.navigateByUrl(`/provider-products/${providerId}`);
  }
}
