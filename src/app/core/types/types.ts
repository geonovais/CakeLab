export interface Produto {
  id?: string; 
  nome: string; 
  descricao: string; 
  categoria: string; 
  preco: number; 
  estoque: number; 
  ativo: boolean; 
  imagem?: string;
}

export interface Admin {
  id?: string;
  nome: string; 
  email: string; 
  senhaHash?: string; 
}