export interface Driver {
  id?: number;
  nome: string;
  numeroHabilitacao: string;
  vencimentoHabilitacao: Date;
  catergoriaHabilitacao?: string;
  categoriaHabilitacao?: string;
}
