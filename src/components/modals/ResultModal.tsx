'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '../../styles/globals.css'
import { Listbox } from '@headlessui/react';
import { DataResponse, Homologacion } from '@/types/ConsultaData';
import { useEffect, useState } from 'react';
import { CuponDataResponse } from '@/types/CuponData';


export default function ResultModal({ isOpen, onClose, data, cupon, cuponData, actualizarHomologacion, loading }: {
    isOpen: boolean;
    onClose: () => void;
    data: DataResponse | null;
    cupon: (data: { consultaId: string; cupon: string; clienteId: string }) => Promise<void>;
    cuponData: CuponDataResponse | null;
    actualizarHomologacion: (data: { consultaId: string; homologacionId: string }) => Promise<void>;
    loading: boolean;
}) {

    const [homologacionSelected, setHomologacionSelected] = useState<Homologacion | null>(null);
    const [isSelected, setIsSelected] = useState(false);
    const [cuponCode, setCuponCode] = useState('');
    const [descuento, setDescuento] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setHomologacionSelected(
                data?.data.data.homologacionesEncontradas.length === 1
                    ? data.data.data.homologacionesEncontradas[0]
                    : null
            );
            setCuponCode('');
            setIsSelected(false);
            setDescuento(data?.data.data.homologacionesEncontradas[0].valorTotal || 0);
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
                        <p className="new-text text-[var(--secondary)]">1.Esta compra tiene una tarifa transaccional asociada de $ {data?.data.data.comisionServicio?.toLocaleString('es-CO')},la cual se informa por este medio. Para confirmar que el usuario está de acuerdo, debe aceptar términos y condiciones. Artículo41, numeral5: “IRREVOCABILIDAD”. La póliza del SOAT no podrá ser revocada por ninguna de las partes intervinientes. <br /> Después de realizada la venta, el  SOAT digital será enviado al correo electrónico, víaSMS, y podrá ser posteriormente descargado de la página de la Aseguradora. Antes de emitir la póliza, debe recibirse el dinero de la póliza más el costo tecnológico. Los datos tales como correo electrónico y número de celular son únicos por póliza.</p>

                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="tyc" id="tyc" checked={isSelected} onChange={(e) => setIsSelected(e.target.checked)} />
                            <label htmlFor="tyc" className="text-[var(--secondary)] font-bold"> Acepto los términos y condiciones, entiendo que este SOAT no se puede anular.</label>
                        </div>

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        {data?.data.data.homologacionesEncontradas && data.data.data.homologacionesEncontradas.length > 0 && (
                            <div className="w-full">
                                <Listbox
                                    value={homologacionSelected}
                                    onChange={async (value) => {
                                        setHomologacionSelected(value);
                                        if (value && data?.consultaId) {
                                            await actualizarHomologacion({
                                                consultaId: data.consultaId,
                                                homologacionId: value.homologacionId
                                            });
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    <div className="relative">
                                        <Listbox.Button
                                            className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                            disabled={loading}
                                        >
                                            {homologacionSelected
                                                ? `$ ${homologacionSelected.valor.toLocaleString('es-CO')} - ${homologacionSelected.claseNombre} a ${homologacionSelected.fin_vigencia}`
                                                : 'Selecciona tipo de Vehículo'}
                                        </Listbox.Button>
                                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                                            </svg>
                                        </div>
                                        <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg">
                                            {data?.data.data.homologacionesEncontradas?.map((type) => (
                                                <Listbox.Option
                                                    key={type.homologacionId}
                                                    value={type}
                                                    className={({ active, selected }) =>
                                                        `cursor-pointer select-none input-style flex items-center text-sm ${active ? 'bg-[var(--primary)] text-white' : 'text-[var(--secondary)]'} ${selected ? 'font-bold' : ''}`
                                                    }
                                                >
                                                    {`$ ${type.valor.toLocaleString('es-CO')} - ${type.claseNombre} a ${type.fin_vigencia}`}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                            </div>
                        )}

                        <hr className="w-full border-t-3 border-[var(--primary)]" />

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (
                            <div className="w-full flex flex-wrap">
                                <p className="w-1/2 text-[var(--secondary)]"><b>Marca: </b> {data?.data.data.vehiculo.marca} </p>
                                <p className="w-1/2 text-[var(--secondary)]"><b>Línea: </b> {data?.data.data.vehiculo.linea} </p>
                                <p className="w-1/2 text-[var(--secondary)]"><b>Modelo: </b> {data?.data.data.vehiculo.modelo} </p>
                                <p className="w-1/2 text-[var(--secondary)]"><b>Cilindraje: </b> {data?.data.data.vehiculo.cilindraje} </p>
                                <p className="w-full flex justify-between text-[var(--secondary)]"><b className="w-1/2">Nueva vigencia desde: </b> <span className="w-1/2 text-[var(--primary)] font-bold">{homologacionSelected?.inicio_vigencia} hasta {homologacionSelected?.fin_vigencia} </span></p>
                            </div>
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (

                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (
                            <div className="w-full flex flex-wrap">
                                <p className="w-1/2 text-[var(--secondary)]">
                                    <b>Costo SOAT: </b> $ {homologacionSelected?.valor?.toLocaleString('es-CO')}
                                </p>
                                <p className="w-1/2 text-[var(--secondary)]">
                                    <b>Costo red de distribución: </b> $ {data?.data.data.comisionServicio?.toLocaleString('es-CO')}
                                </p>
                                <p className="w-full flex justify-between text-[var(--secondary)]">
                                    <b className="w-1/2">Costo de venta total: </b>
                                    <span className="w-1/2 text-[var(--primary)] font-bold">
                                        $ {homologacionSelected?.valorTotal?.toLocaleString('es-CO')}
                                    </span>
                                </p>
                            </div>
                        )}


                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (

                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (
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
                                            ${(cuponData && cuponData?.success) ? 'opacity-50 pointer-events-none' : ''}
                                            `}
                                        onClick={async () => await cupon({ consultaId: data?.consultaId ?? '', cupon: cuponCode, clienteId: data?.clienteId ?? '' })}
                                    >
                                        Validar
                                    </button>
                                </div>
                            </div>
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (

                            <hr className="w-full border-t-3 border-[var(--primary)]" />
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (
                            <div className="w-full">
                                <p className="w-full flex justify-between text-[var(--secondary)]">
                                    <b className="w-1/2">Valor con descuento: </b>
                                    <span className="w-1/2 text-[var(--primary)] font-bold">
                                        $ {descuento.toLocaleString('es-CO')}
                                    </span>
                                </p>
                            </div>
                        )}

                        {(homologacionSelected || data?.data.data.homologacionesEncontradas.length === 1) && (

                            <button type="submit" className={`self-center bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style btn-validar rounded-md hover:scale-95 transition-transform hover:cursor-pointer ${!isSelected || !homologacionSelected ? 'opacity-50 pointer-events-none' : ''}`
                            } disabled={!isSelected || !homologacionSelected} >
                                COMPRAR
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
