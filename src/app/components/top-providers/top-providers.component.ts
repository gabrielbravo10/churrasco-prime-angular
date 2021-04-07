import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProvider } from 'src/app/shared/interfaces/IProvider';
import { ProviderService } from '../../shared/services/provider.service';

@Component({
  selector: 'app-top-providers',
  templateUrl: './top-providers.component.html',
  styleUrls: ['./top-providers.component.scss']
})
export class TopProvidersComponent implements OnInit {

  topProviders: IProvider[] = [];

  constructor(private providerService: ProviderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listTopProviders();
    });
  }

  listTopProviders() {
    this.providerService.findTop3().subscribe((response) => {
      this.topProviders = response;
    })
  }
}
