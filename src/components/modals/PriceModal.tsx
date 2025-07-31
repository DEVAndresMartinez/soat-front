'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import '../../styles/globals.css'

const identificactionTypes = [
    {
        id: 1,
        name: 'Tarjeta de Identidad',
        pref: 'TI'
    },
    {
        id: 2,
        name: 'Cédula de Ciudadania',
        pref: 'CC'
    }
];

export default function PriceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

    const [selected, setSelected] = useState(identificactionTypes[0]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-4xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center gap-3"
                    >
                        {/* <div className="dots-container">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div> */}
                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl">&times;</button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100}></Image>

                        <h2 className="text-xl font-bold text-[var(--secondary)] text-center">Datos necesarios para completar la cotización</h2>
                        <form className="flex flex-col items-center gap-3 w-full">
                            <input type="text" placeholder="Placa del vehículo" className="border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:outline-none hover:ring-2 hover:ring-[var(--primary)]" required autoFocus />
                            <div className="w-full ">
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative">
                                        <Listbox.Button
                                            className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:cursor-pointer transition-all"
                                        >
                                            {selected.name}
                                        </Listbox.Button>

                                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                                            </svg>
                                        </div>
                                        <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none">
                                            {identificactionTypes.map((type) => (
                                                <Listbox.Option
                                                    key={type.id}
                                                    value={type}
                                                    className={({ active, selected }) =>
                                                        `cursor-pointer select-none input-style flex items-center text-sm ${active ? 'bg-[var(--primary)] text-white' : 'text-[var(--secondary)]'
                                                        } ${selected ? 'font-bold' : ''}`
                                                    }
                                                >
                                                    {type.name}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                            </div>

                            <input type="text" placeholder="Número de documento" className="border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:outline-none hover:ring-2 hover:ring-[var(--primary)]" required />

                            <div className="flex flex-col gap-3 w-full">
                                <div className="w-full h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                                    CAPTCHA SIMULADO
                                </div>
                            </div>

                            <button type="submit" className="bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style rounded-md hover:scale-95 transition-transform hover:cursor-pointer">
                                OBTENER INFO VEHICULO
                            </button>

                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
