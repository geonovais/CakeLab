import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../core/types/types';
import { Admins } from '../../core/services/admins';

@Component({
  selector: 'app-consultar-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-admin.html',
  styleUrl: './consultar-admin.css',
})
export class ConsultarAdmin {
  @Output() fecharModal = new EventEmitter<void>();
  
    idBusca: string = ''; 
    
    adminEncontrado: Admin | null = null;
    erroBusca: string = '';
  
    constructor(private admins: Admins) {}
  
    buscarAdmin(): void {
      this.erroBusca = '';
      this.adminEncontrado = null;
      if (!this.idBusca || this.idBusca.trim() === '') {
        this.erroBusca = 'Por favor, digite um ID.';
        return;
      }
  
      this.admins.buscarPorId(this.idBusca).subscribe({
        next: (admin) => {
          if (admin) {
            this.adminEncontrado = admin;
          } else {
            this.erroBusca = 'Admin não encontrado, verifique o ID.';
          }
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          this.erroBusca = 'Admin não encontrado ou erro na conexão.';
        }
      });
    }
  
    fechar() {
      this.fecharModal.emit();
    }
}
