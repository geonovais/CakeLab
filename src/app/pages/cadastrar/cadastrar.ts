import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../core/types/types';
import { Produtos } from '../../core/services/produtos';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {

  @Output() fecharModal = new EventEmitter<void>();
  @Output() produtoCadastrado = new EventEmitter<void>();

  produto: Produto = {
    nome: '',
    descricao: '',
    categoria: '',
    preco: 0,
    estoque: 0,
    ativo: true,
    imagem: ''
  };

  constructor(private service: Produtos) {}

  enviarFormulario(event?: Event) {
    if(event) event.preventDefault();

    this.produto.preco = Number(this.produto.preco);
    this.produto.estoque = Number(this.produto.estoque);

    const produtoParaEnviar = { ...this.produto };
    delete (produtoParaEnviar as any).id;

    this.service.incluir(produtoParaEnviar).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.produtoCadastrado.emit();
        this.fechar();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar produto.');
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.produto.imagem = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  }

  fechar() {
    this.fecharModal.emit();
  }
}
