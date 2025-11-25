import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produtos } from '../../core/services/produtos';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css',
})
export class Excluir {

  @Output() fecharModal = new EventEmitter<void>();

  idExcluir: string = ''; 
  erroMensagem = '';
  confirmandoExclusao = false;

  constructor(private produtos: Produtos) {}

  fechar() {
    this.erroMensagem = '';
    this.confirmandoExclusao = false;
    this.idExcluir = ''; 
    this.fecharModal.emit();
  }

  validarId() {
    this.erroMensagem = '';

    if (!this.idExcluir || this.idExcluir.trim() === '') {
      this.erroMensagem = 'ID inválido. Digite um ID correto.';
      return;
    }

    this.produtos.buscarPorId(this.idExcluir).subscribe({
      next: (produto) => {
        if (produto) {
          this.confirmandoExclusao = true; 
        }
      },
      error: () => {
        this.erroMensagem = 'Produto não encontrado. Verifique o ID e tente novamente.';
      }
    });
  }

  confirmarExclusao() {
    if (!this.idExcluir) return;

    this.produtos.excluir(this.idExcluir).subscribe({
      next: () => {
        alert('Produto excluído com sucesso!');
        this.fechar(); 
      },
      error: () => {
        this.erroMensagem = 'Erro ao excluir o produto.';
      }
    });
  }
}