import { Component } from '@angular/core';
import { IProvider } from './shared/interfaces/IProvider';
import { ProviderService } from './shared/services/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'churrasco-prime-angular';

  providers: IProvider[] = [];

  constructor(private providerService: ProviderService) { }

  public searchProviders(searchTerm: string): void {
    this.providerService.findAll(searchTerm).subscribe((response) => {
      this.providers = response.content;
    });
    for (const prov of this.providers) {
      console.log(prov.name);
    }
  }

}
