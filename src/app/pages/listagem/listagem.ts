import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../../core/types/types';
import { Produtos } from '../../core/services/produtos';

@Component({
  selector: 'app-listagem', 
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './listagem.html', 
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {
  listaProdutos: Produto[] = [];
  constructor(private service: Produtos) {}
  ngOnInit(): void {
  this.service.listar().subscribe((produtos) => {
    this.listaProdutos = produtos.filter(p => p.ativo === true);
  });
}
}