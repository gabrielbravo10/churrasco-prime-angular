import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-okta-login',
  templateUrl: './okta-login.component.html',
  styleUrls: ['./okta-login.component.scss']
})
export class OktaLoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService) {


    this.oktaSignin = new OktaSignIn({
      logo: '../assets/img/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    })

   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'},
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }

}
