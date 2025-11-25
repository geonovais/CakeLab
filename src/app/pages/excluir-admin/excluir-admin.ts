import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admins } from '../../core/services/admins';

@Component({
  selector: 'app-excluir-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './excluir-admin.html',
  styleUrl: './excluir-admin.css',
})
export class ExcluirAdmin {
  @Output() fecharModal = new EventEmitter<void>();
  
    idExcluir: string = ''; 
    erroMensagem = '';
    confirmandoExclusaoAdmin = false;
  
    constructor(private admins: Admins) {}
  
    fechar() {
      this.erroMensagem = '';
      this.confirmandoExclusaoAdmin = false;
      this.idExcluir = ''; 
      this.fecharModal.emit();
    }
  
    validarId() {
      this.erroMensagem = '';
  
      if (!this.idExcluir || this.idExcluir.trim() === '') {
        this.erroMensagem = 'ID inválido. Digite um ID correto.';
        return;
      }
  
      this.admins.buscarPorId(this.idExcluir).subscribe({
        next: (admin) => {
          if (admin) {
            this.confirmandoExclusaoAdmin = true; 
          }
        },
        error: () => {
          this.erroMensagem = 'Admin não encontrado. Verifique o ID e tente novamente.';
        }
      });
    }
  
    confirmarExclusaoAdmin() {
      if (!this.idExcluir) return;
  
      this.admins.excluir(this.idExcluir).subscribe({
        next: () => {
          alert('Admin excluído com sucesso!');
          this.fechar(); 
        },
        error: () => {
          this.erroMensagem = 'Erro ao excluir o admin.';
        }
      });
    }
}
