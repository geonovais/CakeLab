import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../core/types/types';
import { Admins } from '../../core/services/admins';

@Component({
  selector: 'app-alterar-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './alterar-admin.html',
  styleUrl: './alterar-admin.css',
})
export class AlterarAdmin implements OnInit {

  @Input() id!: string;                
  @Output() fecharModal = new EventEmitter<void>();

  admin!: Admin;
  carregando: boolean = true;

  // variáveis separadas para o input de senha
  senhaAtualInput: string | undefined = undefined;
  senhaNovaInput: string | undefined = undefined;
  
  constructor(private admins: Admins) {}

  ngOnInit(): void {
    this.admins.buscarPorId(this.id).subscribe({
      next: (p) => {
        this.admin = { ...p };
        this.carregando = false;
      },
      error: () => {
        alert("Erro ao carregar admin");
        this.fechar();
      }
    });
  }

  salvarAlteracoes() {
    // compara senha atual com a do admin
    if (this.senhaAtualInput !== this.admin.senhaHash) {
      alert("Senha atual incorreta!");
      return;
    }

    // aqui você pode atualizar o admin com a nova senha
    this.admin.senhaHash = this.senhaNovaInput ?? this.admin.senhaHash;

    this.admins.editar(this.admin).subscribe({
      next: () => {
        alert("Admin atualizado com sucesso!");
        this.fechar();
      },
      error: () => {
        alert("Erro ao atualizar admin.");
      }
    });
  }

  fechar() {
    this.fecharModal.emit();
  }
}

