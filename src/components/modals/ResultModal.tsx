'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '../../styles/globals.css'
import { DataResponse, Homologacion } from '@/types/ConsultaData';
import { useEffect, useState } from 'react';
import { CuponDataResponse } from '@/types/CuponData';


export default function ResultModal({ isOpen, onClose, data, cupon, cuponData, actualizarHomologacion, loading, onSubmit }: {
    isOpen: boolean;
    onClose: () => void;
    data: DataResponse | null;
    cupon: (data: { consultaId: string; cupon: string; clienteId: string }) => Promise<void>;
    cuponData: CuponDataResponse | null;
    actualizarHomologacion: (data: { consultaId: string; homologacionId: string }) => Promise<unknown>;
    loading: boolean;
    onSubmit: () => void
}) {

    const [homologacionSelected, setHomologacionSelected] = useState<Homologacion | null>(null);
    const [cuponCode, setCuponCode] = useState('');
    const [descuento, setDescuento] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setHomologacionSelected(
                data?.data?.homologacionesEncontradas?.length === 1
                    ? data.data.homologacionesEncontradas[0]
                    : null
            );
            setCuponCode('');
            setDescuento(data?.data?.homologacionesEncontradas[0]?.valorTotal || 0);
        }
    }, [isOpen, data]);

    useEffect(() => {
        if (cuponData) {
            setDescuento(cuponData.data.totalConDescuento);
        }
    }, [cuponData]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-4xl w-[90%] md:w-[800px] max-h-[90%] min-h-[70%] p-modal shadow-lg relative flex flex-col gap-4 overflow-style">
                        {loading && (
                            <section className="dots-container rounded-4xl">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </section>
                        )}
                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl hover:cursor-pointer">&times;</button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100} className="self-center"></Image>

                        <h1 className="font-bold text-[var(--secondary)]">Condiciones:</h1>
                        <p className="new-text text-[var(--secondary)]">1. Esta compra tiene una tarifa transaccional asociada de $ {data?.data.comisionServicio?.toLocaleString('es-CO')}, la cual se informa por este medio. Para confirmar que el usuario está de acuerdo, debe aceptar términos y condiciones. Artículo 41, numeral 5: “IRREVOCABILIDAD”. La póliza del SOAT no podrá ser revocada por ninguna de las partes intervinientes. <br /> Después de realizada la venta, el  SOAT digital será enviado al correo electrónico, vía SMS, y podrá ser posteriormente descargado de la página de la Aseguradora. Antes de emitir la póliza, debe recibirse el dinero de la póliza más el costo tecnológico. Los datos tales como correo electrónico y número de celular son únicos por póliza.</p>

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        {data?.data.homologacionesEncontradas && data.data?.homologacionesEncontradas?.length > 0 && (
                            <div className="w-full flex flex-col gap-2">
                                {data.data.homologacionesEncontradas.map((type) => (
                                    <label
                                        key={type.homologacionId}
                                        className="relative flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 hover:border-[var(--primary)] hover:shadow-md"
                                    >
                                        <input
                                            type="radio"
                                            name="homologacion"
                                            value={type.homologacionId}
                                            checked={homologacionSelected?.homologacionId === type.homologacionId}
                                            onChange={async () => {
                                                setHomologacionSelected(type);
                                                if (data?.consultaId) {
                                                    await actualizarHomologacion({
                                                        consultaId: data.consultaId,
                                                        homologacionId: type.homologacionId,
                                                    });
                                                }
                                            }}
                                            className="peer hidden"
                                        />

                                        <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] transition-all">
                                            <span className="w-2.5 h-2.5 rounded-full bg-white peer-checked:bg-white"></span>
                                        </span>

                                        <span className="text-sm text-[var(--secondary)] peer-checked:font-semibold peer-checked:text-[var(--primary)]">
                                            {`$ ${type.valor.toLocaleString('es-CO')} - ${type.claseNombre} a ${type.fin_vigencia}`}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (
                            <div className="w-full flex flex-col md:flex-row flex-wrap gap-x-4">
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Marca: </b> 
                                    <p>{data?.data.vehiculo.marca}</p> 
                                </div>
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Línea: </b> 
                                    <p>{data?.data.vehiculo.linea}</p> 
                                </div>
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Modelo: </b> 
                                    <p>{data?.data.vehiculo.modelo}</p> 
                                </div>
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Cilindraje: </b> 
                                    <p>{data?.data.vehiculo.cilindraje}</p> 
                                </div>
                                <div className="w-full flex justify-between text-[var(--secondary)]">
                                    <b className="w-1/2">Nueva vigencia desde: </b> 
                                    <span className="w-1/2 text-[var(--primary)] font-bold text-right">{homologacionSelected?.inicio_vigencia} hasta {homologacionSelected?.fin_vigencia} </span>
                                </div>
                            </div>
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (
                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (
                            <div className="w-full flex flex-col md:flex-row flex-wrap gap-x-4">
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Costo SOAT: </b> 
                                    <p>$ {homologacionSelected?.valor?.toLocaleString('es-CO')}</p>
                                </div>
                                <div className="w-full md:w-[48%] text-[var(--secondary)] flex justify-between md:flex-nowrap">
                                    <b>Costo red de distribución: </b> 
                                    <p>$ {data?.data.comisionServicio?.toLocaleString('es-CO')}</p>
                                </div>
                                <div className="w-full flex justify-between text-[var(--secondary)]">
                                    <b className="w-1/2">Costo de venta total: </b>
                                    <span className="w-1/2 text-[var(--primary)] font-bold text-right">
                                        $ {homologacionSelected?.valorTotal?.toLocaleString('es-CO')}
                                    </span>
                                </div>
                            </div>
                        )}


                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (

                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (
                            <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-between">
                                <label htmlFor="code" className="w-full md:w-1/2 text-[var(--secondary)] font-bold">¿Tienes un código de descuento?</label>
                                <div className="w-full md:w-1/2 flex gap-3 justify-center">
                                    {cuponData?.success && (
                                        <span className="min-h-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    )}
                                    <input type="text" id="code" placeholder="Ingresa código aquí" className={`w-2/3 border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:outline-none hover:ring-2 hover:ring-[var(--primary)] ${cuponData?.success ? 'opacity-50 pointer-events-none' : ''}`}
                                        value={cuponCode}
                                        onChange={(e) => {
                                            setCuponCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())
                                        }}
                                        maxLength={20}
                                        minLength={5}
                                        disabled={cuponData?.success}
                                    />
                                    <button
                                        type="submit"
                                        className={`w-1/3 bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style btn-validar rounded-md hover:scale-95 transition-transform hover:cursor-pointer
                                            ${(cuponCode.length < 5 || cuponData?.success) ? 'opacity-50 pointer-events-none' : ''}
                                            `}
                                        onClick={async () => await cupon({ consultaId: data?.consultaId ?? '', cupon: cuponCode, clienteId: data?.clienteId ?? '' })}
                                        disabled={cuponCode.length < 5}
                                    >
                                        Validar
                                    </button>
                                </div>
                            </div>
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (

                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (
                            <div className="w-full flex flex-col md:flex-row flex-wrap gap-x-4">
                                <div className="w-full text-[var(--secondary)] flex justify-between">
                                    <b>Valor con descuento: </b>
                                    <p className="flex-1 text-[var(--primary)] font-bold text-right">
                                        $ {descuento.toLocaleString('es-CO')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {(homologacionSelected || data?.data?.homologacionesEncontradas?.length === 1) && (

                            <button type="submit" className={`self-center bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style btn-validar rounded-md hover:scale-95 transition-transform hover:cursor-pointer ${!homologacionSelected ? 'opacity-50 pointer-events-none' : ''}`
                            } disabled={!homologacionSelected} onClick={() => onSubmit()}>
                                COMPRAR
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
