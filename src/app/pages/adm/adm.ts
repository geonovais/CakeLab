import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Produto } from '../../core/types/types';
import { Produtos } from '../../core/services/produtos';
import { Admin } from '../../core/types/types';
import { Admins } from '../../core/services/admins';
import { Cadastrar } from '../cadastrar/cadastrar'; 
import { Consultar } from '../consultar/consultar';
import { Alterar } from '../alterar/alterar';
import { Excluir } from '../excluir/excluir';
import { AlterarAdmin } from '../alterar-admin/alterar-admin';
import { ExcluirAdmin } from '../excluir-admin/excluir-admin';
import { ConsultarAdmin } from '../consultar-admin/consultar-admin';
import { CadastrarAdmin } from '../cadastrar-admin/cadastrar-admin';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adm',
  standalone: true, 
  imports: [CommonModule, Cadastrar, Consultar, Alterar, Excluir, AlterarAdmin, ExcluirAdmin, ConsultarAdmin, CadastrarAdmin,FormsModule], 
  templateUrl: './adm.html',
  styleUrl: './adm.css',
})
export class Adm implements OnInit {

  mostrarListaProdutos = true;
  mostrarListaAdmins = false;
  
  listaAdmins: Admin[] = [];
  listaProdutos: Produto[] = [];
  
  // Cadastrar
  mostrarModalCadastro = false;
  mostrarModalCadastroAdmin = false;
  
  // Consultar
  mostrarConsulta: boolean = false;
  mostrarConsultaAdmin: boolean = false;

  // Editar
  modalEditarAberto = false;
  idParaEditar!: string; 
  modalEditarAdminAberto = false;

  // Excluir
  modalExcluirAberto = false;
  modalExcluirAdminAberto = false;
  idParaExcluir: string | null = null;
  idParaExcluirAdmin: string | null = null; 
  mostrarExcluir: boolean = false;
  mostrarExcluirAdm: boolean = false;

  adminLogadoNome: string | null = null;

  constructor(private service: Produtos, private admins: Admins, private router: Router) {}

  ngOnInit(): void {
    this.adminLogadoNome = localStorage.getItem('adminNome');
    this.carregarProdutos();
  }

  alternarLista() {
    if (this.mostrarListaProdutos) {
      this.mostrarListaProdutos = false;
      this.mostrarListaAdmins = true;

      this.admins.listar().subscribe({
        next: (res) => this.listaAdmins = res,
        error: () => alert("Erro ao carregar admins!")
      });

    } else {
      this.mostrarListaAdmins = false;
      this.mostrarListaProdutos = true;

      this.carregarProdutos();
    }
  }

  mostrarCadastrarProduto() {
    this.mostrarModalCadastro = true;
  }

   mostrarCadastrarAdmin() {
    this.mostrarModalCadastroAdmin = true;
  }

  mostrarConsultarProduto() {
    this.mostrarConsulta = true;
  }


  mostrarExcluirProduto() {
    this.mostrarExcluir = true;
  }

  mostrarConsultarAdmin() {
    this.mostrarConsultaAdmin = true;
  }

  mostrarExcluirAdmin() {
    this.mostrarExcluirAdm = true;
  }

  abrirCadastro() {
    if (this.mostrarListaProdutos) {
      this.mostrarCadastrarProduto();
    } else {
      this.mostrarCadastrarAdmin();
    }
  }

  abrirConsulta() {
    if (this.mostrarListaProdutos) {
      this.mostrarConsultarProduto();
    } else {
      this.mostrarConsultarAdmin();
    }
  }

  abrirExcluir() {
    if (this.mostrarListaProdutos) {
      this.mostrarExcluirProduto();
    } else {
      this.mostrarExcluirAdmin();
    }
  }

  carregarProdutos() {
    this.service.listar().subscribe((produtos) => {
      this.listaProdutos = produtos;
    });
  }

  carregarAdmins() {
    this.admins.listar().subscribe((admins) => {
      this.listaAdmins = admins;
    });
  }

  fecharCadastro() {
    this.mostrarModalCadastro = false;
    this.carregarProdutos();
  }

  fecharCadastroAdmin() {
    this.mostrarModalCadastroAdmin = false;
    this.carregarAdmins();
  }

  fecharConsulta() {
    this.mostrarConsulta = false;
  }

  fecharConsultaAdmin() {
    this.mostrarConsultaAdmin = false;
  }

  abrirEditar(id: string) {
    this.idParaEditar = id;
    this.modalEditarAberto = true;
  }

  abrirEditarAdmin(id: string) {
    this.idParaEditar = id;
    this.modalEditarAdminAberto = true;
  }

  abrirModalExcluir(id: string) {
    this.idParaExcluir = id;
    this.modalExcluirAberto = true;
  }

  abrirModalExcluirAdmin(id: string) {
    this.idParaExcluirAdmin = id;
    this.modalExcluirAdminAberto = true;
  }

  fecharModalExcluir() {
    this.modalExcluirAberto = false;
    this.idParaExcluir = null;
    this.carregarProdutos();
  }

  fecharModalExcluirAdmin() {
    this.modalExcluirAdminAberto = false;
    this.idParaExcluir = null;
    this.carregarAdmins();
  }

  confirmarExclusao() {
    if (this.idParaExcluir) {
      this.excluir(this.idParaExcluir);
      this.fecharModalExcluir();
    }
  }
  
  confirmarExclusaoAdmin() {
    if (this.idParaExcluirAdmin) {
      this.excluirAdmin(this.idParaExcluirAdmin);
      this.fecharModalExcluirAdmin();
    }
  }

  excluir(id: string) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.carregarProdutos(); 
      });
    }
  }
  excluirAdmin(id: string) {
    if (id) {
      this.admins.excluir(id).subscribe(() => {
        this.carregarAdmins(); 
      });
    }
  }

  modalLogoutAberto = false;

  abrirModalLogout() {
  this.modalLogoutAberto = true;
}

fecharModalLogout() {
  this.modalLogoutAberto = false;
}

confirmarLogout() {
  this.modalLogoutAberto = false;

  localStorage.removeItem('adminLogado');
  localStorage.removeItem('adminNome');

  this.router.navigate(['/adm-login']);
}
}