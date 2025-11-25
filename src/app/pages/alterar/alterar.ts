import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../core/types/types';
import { Produtos } from '../../core/services/produtos';

@Component({
  selector: 'app-alterar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alterar.html',
  styleUrl: './alterar.css',
})
export class Alterar implements OnInit {

  @Input() id!: string;                
  @Output() fecharModal = new EventEmitter<void>();

  produto!: Produto;
  carregando: boolean = true;

  constructor(private produtos: Produtos) {}

  ngOnInit(): void {
    this.produtos.buscarPorId(this.id).subscribe({
      next: (p) => {
        this.produto = { ...p };       
        this.carregando = false;
      },
      error: () => {
        alert("Erro ao carregar produto!");
        this.fechar();
      }
    });
  }

  salvarAlteracoes() {
    this.produto.preco = Number(this.produto.preco);
    this.produto.estoque = Number(this.produto.estoque);

    this.produtos.editar(this.produto).subscribe({
        next: () => {
            alert("Produto atualizado com sucesso!");
            this.fechar();
        },
        error: () => {
            alert("Erro ao atualizar produto.");
        }
    });
  }

  fechar() {
    this.fecharModal.emit();
  }
}