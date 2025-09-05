'use client';

import { ValidateCuponData } from "@/types/ValidateCuponData";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';


export default function ValidateCuponModal({ isOpen, onClose, data, loading }: {
    isOpen: boolean;
    onClose: () => void;
    data: ValidateCuponData | null
    loading: boolean;
}) {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">

                    {(typeof data?.data?.totalUsos === "number" && data?.data?.totalUsos > 0) && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-4xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center">
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

                            <h2 className="text-2xl font-bold text-[var(--secondary)] text-center">
                                ¡Felicidades! <br />
                                {data?.data?.nombrePropietario}
                            </h2>
                            <p className="text-center text-[var(--secondary)] text-flama text-xl">
                                Llevas
                            </p>
                            <p className="text-8xl font-bold text-[var(--primary)] text-center">
                                {data?.data?.totalUsos}
                            </p>
                            <p className="text-center text-[var(--secondary)] text-flama text-xl">
                                SOAT vendidos con tu código.
                            </p>
                            <p className="text-center text-[var(--secondary)] font-bold text-2xl text-flama">
                                Cada venta te acerca a lograr que tu próximo SOAT te salga gratis.<br />
                                Sigue compartiendo tu código y acumula más beneficios.
                            </p>
                        </motion.div>
                    )}

                    {typeof data?.data?.totalUsos === "number" && data?.data?.totalUsos === 0 && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-4xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center">
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

                            <h2 className="text-2xl font-bold text-[var(--secondary)] text-center mb-modal">
                                Aún no has vendido ningún SOAT con tu código:
                            </h2>
                            <p className="text-4xl font-bold text-[var(--primary)] text-center mb-modal">
                                {data?.data?.couponCodes}
                            </p>
                            <p className="text-center text-[var(--secondary)] font-bold text-xl text-flama mb-modal">
                                Comparte este código y empieza a acumular beneficios para que tu próximo SOAT te salga gratis.
                            </p>
                            <p className="text-center text-[var(--secondary)] font-bold text-xl text-flama">
                                ¡Entre más compartas, más ganas!
                            </p>
                        </motion.div>
                    )}

                    {(!data || data?.success === false) && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-4xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center text-center"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl hover:cursor-pointer"
                            >
                                &times;
                            </button>

                            <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100} />

                            <h2 className="text-2xl font-bold text-[var(--secondary)] text-center mb-modal">
                                Cliente no encontrado
                            </h2>
                            <p className="text-center text-[var(--secondary)] font-bold text-xl text-flama">
                                Verifica el documento e inténtalo de nuevo.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )

}