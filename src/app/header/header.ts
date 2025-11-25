import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Admins } from '../core/services/admins';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})


export class Header {

  constructor(private router: Router, private admins: Admins) {}

  mostrarLoginAdmin = false;
  usuario = '';
  senha = '';

  abrirLoginAdmin() {
    this.mostrarLoginAdmin = true;
  }

  fecharLoginAdmin() {
    this.mostrarLoginAdmin = false;
  }

  entrarAdmin() {
    this.admins.listar().subscribe((lista) => {

      const admin = lista.find(a => a.email === this.usuario);

      if (!admin) {
        alert('Admin não encontrado!');
        return;
      }

      if (admin.senhaHash === this.senha) {
        localStorage.setItem('adminNome', admin.nome);
        this.mostrarLoginAdmin = false;
        this.router.navigate(['/adm']);
      } else {
        alert('Senha incorreta!');
      }

    });
  }
  
}
