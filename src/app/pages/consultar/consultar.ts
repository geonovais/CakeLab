import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../core/types/types';
import { Produtos } from '../../core/services/produtos';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar.html',
  styleUrl: './consultar.css',
})
export class Consultar {

  @Output() fecharModal = new EventEmitter<void>();

  idBusca: string = ''; 
  
  produtoEncontrado: Produto | null = null;
  erroBusca: string = '';

  constructor(private produtos: Produtos) {}

  buscarProduto(): void {
    this.erroBusca = '';
    this.produtoEncontrado = null;
    if (!this.idBusca || this.idBusca.trim() === '') {
      this.erroBusca = 'Por favor, digite um ID.';
      return;
    }

    this.produtos.buscarPorId(this.idBusca).subscribe({
      next: (produto) => {
        if (produto) {
          this.produtoEncontrado = produto;
        } else {
          this.erroBusca = 'Produto não encontrado, verifique o ID.';
        }
      },
      error: (err) => {
        console.error('Erro na busca:', err);
        this.erroBusca = 'Produto não encontrado ou erro na conexão.';
      }
    });
  }

  fechar() {
    this.fecharModal.emit();
  }
}