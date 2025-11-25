import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../core/types/types';
import { Admins } from '../../core/services/admins';

@Component({
  selector: 'app-cadastrar-admin',
  imports: [ CommonModule, FormsModule],
  templateUrl: './cadastrar-admin.html',
  styleUrl: './cadastrar-admin.css',
})
export class CadastrarAdmin {
  @Output() fecharModal = new EventEmitter<void>();
    @Output() produtoCadastrado = new EventEmitter<void>();
  
    admin: Admin = {
      nome: '',
      email: '',
      senhaHash: ''
    };
  
    constructor(private admins: Admins) {}
  
    enviarFormulario(event?: Event) {
      if(event) event.preventDefault();
  
      const adminParaEnviar = { ...this.admin };
      delete (adminParaEnviar as any).id;
  
      this.admins.incluir(adminParaEnviar).subscribe({
        next: () => {
          alert('Admin cadastrado com sucesso!');
          this.produtoCadastrado.emit();
          this.fechar();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar admin.');
        }
      });
    }
  
    fechar() {
      this.fecharModal.emit();
    }
}
