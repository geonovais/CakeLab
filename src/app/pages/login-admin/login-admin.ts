import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from '../../core/services/admins';
import { Admin } from '../../core/types/types';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {

  usuario = '';
  senha = '';

  constructor(
    private admins: Admins,
    private router: Router
  ) {}

  entrarAdmin() {
  this.admins.listar().subscribe((lista) => {

    const admin = lista.find(a => a.email === this.usuario);

    if (!admin) {
      alert('Admin não encontrado!');
      return;
    }

    if (admin.senhaHash === this.senha) {

      localStorage.setItem('adminNome', admin.nome);
      localStorage.setItem('adminLogado', 'true');
      localStorage.setItem('adminEmail', admin.email);
      localStorage.setItem('adminSenha', admin.senhaHash);
      this.router.navigate(['/adm']); 
    } 
    else {
      alert('Senha incorreta!');
    }

  });
}


  

}
