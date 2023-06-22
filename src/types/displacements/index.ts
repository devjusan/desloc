export interface Displacement {
    id: number,
    kmInicial: number,
    kmFinal: number | null,
    inicioDeslocamento: Date,
    fimDeslocamento: number | null,
    checkList: string,
    motivo: string,
    observacao: string,
    idCondutor: number,
    idVeiculo: number,
    idCliente: number
}