import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  },{ 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'signup', 
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) 
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)

    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules
    // ,initialNavigation:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
