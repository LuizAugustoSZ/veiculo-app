import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'veiculo',
    loadComponent: () =>
      import('./veiculo/veiculo.page').then((m) => m.VeiculoPage),
  },
  {
    path: 'criarveiculo',
    loadComponent: () =>
      import('./criarveiculo/criarveiculo.page').then((m) => m.CriarveiculoPage),
  },
];
