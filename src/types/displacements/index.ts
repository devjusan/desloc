export interface Displacement {
    id: number,
    kmInicial: number,
    kmFinal: number | null,
    inicioDeslocamento: Date | null,
    fimDeslocamento: Date | null,
    checkList: string,
    motivo: string,
    observacao: string,
    idCondutor: number,
    idVeiculo: number,
    idCliente: number
}