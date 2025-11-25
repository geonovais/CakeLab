import { Routes } from '@angular/router';
import { Listagem } from './pages/listagem/listagem';
import { Adm } from './pages/adm/adm';
import { LoginAdmin } from './pages/login-admin/login-admin';

export const routes: Routes = [
  { path: '', component: Listagem },
  { path: 'listagem', component: Listagem },

  // LOGIN DO ADMIN
  { path: 'adm-login', component: LoginAdmin },

  // PAINEL ADMIN (PROTEGIDO)
  {
    path: 'adm',
    component: Adm,
    canMatch: [
      () => {
        return localStorage.getItem('adminLogado') === 'true';
      }
    ]
  },

  { path: '**', redirectTo: 'adm-login', pathMatch: 'full' }
];


