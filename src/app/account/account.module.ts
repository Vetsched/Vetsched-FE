import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PetLoversComponent } from './pet-lovers/pet-lovers.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pet-lovers/pets/pets.component';
import { ViewPetComponent } from './pet-lovers/view-pet/view-pet.component';
import { AddPetComponent } from './pet-lovers/add-pet/add-pet.component';
import { ViewServiceProviderComponent } from './pet-lovers/view-service-provider/view-service-provider.component';
import { RequestsComponent } from './service-provider/requests/requests.component';
import { PetLoverComponent } from './service-provider/pet-lover/pet-lover.component';
import { RequestComponent } from './service-provider/requests/request/request.component';
import { ProviderComponent } from './pet-lovers/provider/provider.component';
import { AddServiceProviderComponent } from './add-service-provider/add-service-provider.component';
import { PetComponent } from './pet-lovers/pets/pet/pet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModalComponent } from './services-modal/services-modal.component';
import { SendRequestComponent } from './add-service-provider/send-request/send-request.component';
import { PetLoverPetsComponent } from './service-provider/pet-lover-pets/pet-lover-pets.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AccountComponent,
    NavBarComponent,
    PetLoversComponent,
    ServiceProviderComponent,
    ConfirmDeleteComponent,
    ViewProfileComponent,
    HomeComponent,
    PetsComponent,
    ViewPetComponent,
    AddPetComponent,
    ViewServiceProviderComponent,
    RequestsComponent,
    PetLoverComponent,
    RequestComponent,
    ProviderComponent,
    AddServiceProviderComponent,
    PetComponent,
    ServicesModalComponent,
    SendRequestComponent,
    PetLoverPetsComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
