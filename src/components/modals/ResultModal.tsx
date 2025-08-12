'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '../../styles/globals.css'


export default function ResultModal({ isOpen, onClose, data }: {
    isOpen: boolean;
    onClose: () => void;
    data: {
        marca: string;
        linea: string;
        modelo: string;
        cilindraje: string;
        vigenciaDesde: string;
        vigenciaHasta: string;
        costoSoat: number;
        costoDistribucion: number;
        total: number;
    } | null;
}) {

    console.log(data);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-4xl w-[90%] md:w-[800px] max-h-[90%] p-modal shadow-lg relative flex flex-col gap-4 overflow-style">
                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl hover:cursor-pointer">&times;</button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100} className="self-center"></Image>

                        <h1 className="font-bold text-[var(--secondary)]">Condiciones:</h1>
                        <p className="new-text text-[var(--secondary)]">1.Esta compra tiene una tarifa transaccional asociada de $20.000,la cual se informa por este medio. Para confirmar que el usuario está de acuerdo, debe aceptar términos y condiciones. Artículo41, numeral5: “IRREVOCABILIDAD”. La póliza del SOAT no podrá ser revocada por ninguna de las partes intervinientes. <br /> Después de realizada la venta, el  SOAT digital será enviado al correo electrónico, víaSMS, y podrá ser posteriormente descargado de la página de la Aseguradora. Antes de emitir la póliza, debe recibirse el dinero de la póliza más el costo tecnológico. Los datos tales como correo electrónico y número de celular son únicos por póliza.</p>

                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="tyc" id="tyc" />
                            <label htmlFor="tyc" className="text-[var(--secondary)] font-bold"> Acepto los términos y condiciones, entiendo que este SOAT no se puede anular.</label>
                        </div>

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        <div className="w-full flex flex-wrap">
                            <p className="w-1/2 text-[var(--secondary)]"><b>Marca: </b> {data?.marca} </p>
                            <p className="w-1/2 text-[var(--secondary)]"><b>Línea: </b> {data?.linea} </p>
                            <p className="w-1/2 text-[var(--secondary)]"><b>Modelo: </b> {data?.modelo} </p>
                            <p className="w-1/2 text-[var(--secondary)]"><b>Cilindraje: </b> {data?.cilindraje} </p>
                            <p className="w-full flex justify-between text-[var(--secondary)]"><b className="w-1/2">Nueva vigencia desde: </b> <span className="w-1/2 text-[var(--primary)] font-bold">{data?.vigenciaDesde} hasta {data?.vigenciaHasta} </span></p>
                        </div>

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        <div className="w-full flex flex-wrap">
                            <p className="w-1/2 text-[var(--secondary)]">
                                <b>Costo SOAT: </b> $ {data?.costoSoat?.toLocaleString('es-CO')}
                            </p>
                            <p className="w-1/2 text-[var(--secondary)]">
                                <b>Costo red de distribución: </b> $ {data?.costoDistribucion?.toLocaleString('es-CO')}
                            </p>
                            <p className="w-full flex justify-between text-[var(--secondary)]">
                                <b className="w-1/2">Costo de venta total: </b>
                                <span className="w-1/2 text-[var(--primary)] font-bold">
                                    $ {data?.total?.toLocaleString('es-CO')}
                                </span>
                            </p>
                        </div>


                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-between">
                            <label htmlFor="code" className="w-full md:w-1/2 text-[var(--secondary)] font-bold">¿Tienes un código de descuento?</label>
                            <div className="w-full md:w-1/2 flex gap-3 justify-center">
                                <input type="text" id="code" placeholder="Ingresa código aquí" className="w-2/3 border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:outline-none hover:ring-2 hover:ring-[var(--primary)]" />
                                <button type="submit" className="w-1/3 bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style btn-validar rounded-md hover:scale-95 transition-transform hover:cursor-pointer">
                                    Validar
                                </button>
                            </div>
                        </div>

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        <div className="w-full">
                            <p className="w-full flex justify-between text-[var(--secondary)]">
                                <b className="w-1/2">Costo de venta total: </b>
                                <span className="w-1/2 text-[var(--primary)] font-bold">
                                    $ {data?.total?.toLocaleString('es-CO')}
                                </span>
                            </p>
                        </div>

                        <button type="submit" className="self-center bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style btn-validar rounded-md hover:scale-95 transition-transform hover:cursor-pointer">
                            COMPRAR
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
