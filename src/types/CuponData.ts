export type CuponDataResponse = {
    success: boolean;
    canApply: boolean;
    message: string;
    data: CuponData;
    metadata: Metadata;
}

export type CuponData = {
    consultaId: string;
    cupon: string;
    tipoDescuento: string;
    subtotal: number;
    descuentoCalculado: number;
    totalConDescuento: number;
    moneda: string;
}

export type Metadata = {
    cuponId: string;
    periodoId: string;
    usosRestantes: string;
    motivosRechazo: unknown[]
}