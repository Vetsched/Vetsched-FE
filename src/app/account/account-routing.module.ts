import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { AccountComponent } from './account.component';
import { AddServiceProviderComponent } from './add-service-provider/add-service-provider.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pet-lovers/pets/pets.component';
import { PetLoverPetsComponent } from './service-provider/pet-lover-pets/pet-lover-pets.component';
import { RequestsComponent } from './service-provider/requests/requests.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'add-service-provider',
        component: AddServiceProviderComponent,
      },
      {
        path: 'pets',
        component: PetsComponent,
      },
      {
        path: 'requests',
        component: RequestsComponent,
      },
      {
        path: 'chat/:userId',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'pets/:PetLoverId',
        component: PetLoverPetsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
