export type DataResponse = {
    success: boolean;
    message: string;
    placa: string;
    cedula: number;
    consultaId: string;
    clienteId: string;
    data: DataTwo;
    timestamp: string;
    api_key_used: string;
}

export type Data = {
    success: boolean;
    message: string;
    data: DataTwo;
}

export type DataTwo = {
    comisionServicio: number;
    fechaInicioVigencia: string;
    fechaFinVigencia: string;
    tipoDocumento: string;
    placa: string;
    homologacion: string;
    documento: number;
    homologacionesEncontradas: Homologacion[];
    vehiculo: Vehiculo;
    propietario: Propietario;
    ciudad: string;
    nombre: string;
    apellido: string;
}

export type Homologacion = {
    valor: number;
    inicio_vigencia: string;
    fin_vigencia: string;
    estado: string;
    reply: string;
    respuesta: string;
    valorTotal: number;
    homologacionId: string;
    claseNombre: string;
};

export type Vehiculo = {
    marca: string;
    linea: string;
    modelo: string;
    cilindraje: string;
    tipoCarroceria: string;

}

export type Propietario = {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    sexo: string;
    ciudadtxt: string;
    dptoNum: string;
    ciuNum: string;
}