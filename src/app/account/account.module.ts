import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PetloverComponent } from './petlover/petlover.component';
import { ServiceproviderComponent } from './serviceprovider/serviceprovider.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './petlover/pets/pets.component';
import { ViewPetComponent } from './petlover/view-pet/view-pet.component';
import { AddPetComponent } from './petlover/add-pet/add-pet.component';
import { ViewServiceProviderComponent } from './petlover/view-service-provider/view-service-provider.component';
import { RequestsComponent } from './serviceprovider/requests/requests.component';


@NgModule({
  declarations: [
    AccountComponent,
    NavBarComponent,
    PetloverComponent,
    ServiceproviderComponent,
    ConfirmDeleteComponent,
    ViewProfileComponent,
    HomeComponent,
    PetsComponent,
    ViewPetComponent,
    AddPetComponent,
    ViewServiceProviderComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
