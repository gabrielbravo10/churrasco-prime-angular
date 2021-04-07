import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private providerService: ProviderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProviders();
    });
  }

  listProviders(filter?: string) {
    this.providerService.findAll(filter).subscribe((response: IPaginated<IProvider>) => {
      this.providers = response.content;
    },
      (error) => {
        console.log(error);
      })
  }
}
