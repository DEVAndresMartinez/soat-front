export type PaymentMethodResponse = {
    success: boolean,
    data: DataPaymentMethod[]
}

export type DataPaymentMethod = {
    id: string,
    nombre: string
}