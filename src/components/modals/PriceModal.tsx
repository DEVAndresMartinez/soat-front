'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';

const identificactionTypes = [
    { id: 1, name: 'Cédula de Ciudadania', pref: 'C' },
    { id: 2, name: 'NIT', pref: 'NIT' }
];

const validatePlaca = (value: string) =>
    /^[A-Z0-9]{5,6}$/.test(value) ? '' : 'La placa debe tener 5 o 6 caracteres';

const validateNumeroDoc = (value: string) =>
    /^\d{5,10}$/.test(value) ? '' : 'El número de documento debe tener entre 5 y 10 dígitos';

function ValidatedInput({ value, onChange, placeholder, error, maxLength, minLength, filter, ...props }: { 
    value: string; onChange: (v: string) => void; placeholder: string; error?: string; maxLength?: number; minLength?: number; filter: (v: string) => string; [key: string]: unknown;
}) {
    return (
        <div className="w-full">
            <input
                {...props}
                type="text"
                placeholder={placeholder}
                className={`w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${error ? 'border-red-500' : ''}`}
                value={value}
                maxLength={maxLength}
                minLength={minLength}
                onChange={e => {
                    const filtered = filter(e.target.value);
                    onChange(filtered);
                }}
            />
            {error && <span className="text-red-500 text-xs text-center block">{error}</span>}
        </div>
    );
}

export default function PriceModal({ isOpen, onClose, onSubmit }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { placa: string; tipoDoc: string; numeroDoc: number }) => void;
}) {
    const [selected, setSelected] = useState(identificactionTypes[0]);
    const [placa, setPlaca] = useState('');
    const [numeroDoc, setNumeroDoc] = useState('');
    const [loading, setLoading] = useState(false);
    const [placaError, setPlacaError] = useState('');
    const [numeroDocError, setNumeroDocError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setPlaca('');
            setNumeroDoc('');
            setSelected(identificactionTypes[0]);
            setLoading(false);
            setPlacaError('');
            setNumeroDocError('');
        }
    }, [isOpen]);

    const handlePlacaChange = (value: string) => {
        setPlaca(value);
        setPlacaError(validatePlaca(value));
    };

    const handleNumeroDocChange = (value: string) => {
        setNumeroDoc(value);
        setNumeroDocError(validateNumeroDoc(value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (placaError || numeroDocError || !placa || !numeroDoc) return;
        setLoading(true);
        try {
            await onSubmit({
                placa,
                tipoDoc: selected.pref,
                numeroDoc: Number(numeroDoc)
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-4xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center"
                    >
                        {loading && (
                            <section className="dots-container rounded-4xl">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </section>
                        )}

                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl hover:cursor-pointer">
                            &times;
                        </button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100} />

                        <h2 className="text-xl font-bold text-[var(--secondary)] text-center mb-modal">
                            Datos necesarios para completar la cotización
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
                            <ValidatedInput
                                value={placa}
                                onChange={handlePlacaChange}
                                placeholder="Placa del vehículo"
                                error={placaError}
                                maxLength={6}
                                minLength={5}
                                filter={v => v.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}
                                autoFocus
                            />

                            <div className="w-full">
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative">
                                        <Listbox.Button className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                                            {selected.name}
                                        </Listbox.Button>
                                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                                            </svg>
                                        </div>
                                        <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg">
                                            {identificactionTypes.map((type) => (
                                                <Listbox.Option
                                                    key={type.id}
                                                    value={type}
                                                    className={({ active, selected }) =>
                                                        `cursor-pointer select-none input-style flex items-center text-sm ${active ? 'bg-[var(--primary)] text-white' : 'text-[var(--secondary)]'} ${selected ? 'font-bold' : ''}`
                                                    }
                                                >
                                                    {type.name}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                            </div>

                            <ValidatedInput
                                value={numeroDoc}
                                onChange={handleNumeroDocChange}
                                placeholder="Número de documento"
                                error={numeroDocError}
                                maxLength={10}
                                minLength={5}
                                filter={v => v.replace(/[^0-9]/g, '')}
                            />

                            <div className="flex flex-col gap-3 w-full m-modal">
                                <div className="w-full h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                                    CAPTCHA SIMULADO
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style rounded-md transition-transform
                                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}
                                    ${(!placa || !numeroDoc || placaError || numeroDocError) ? 'opacity-50 pointer-events-none' : ''}
                                `}
                                disabled={loading || !placa || !numeroDoc || !!placaError || !!numeroDocError}
                            >
                                OBTENER INFO VEHÍCULO
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}