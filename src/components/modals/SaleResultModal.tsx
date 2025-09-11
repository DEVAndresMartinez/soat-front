/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SaleResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    saleResult: any | null;
}

export default function SaleResultModal({
    isOpen,
    onClose,
    saleResult,
}: SaleResultModalProps) {
    
    if (!isOpen || !saleResult) return null;

    const handleCopy = () => {
        if (saleResult.data?.pse?.linkPago) {
            navigator.clipboard.writeText(saleResult.data.pse.linkPago);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl w-[90%] md:w-[350px] p-modal shadow-lg relative flex flex-col items-center"
                    >
                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl hover:cursor-pointer">
                            &times;
                        </button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={80} height={80} className="w-[100px] h-auto"/>

                        <h2 className="text-xl font-bold text-[var(--secondary)] text-center mb-modal">
                            {saleResult.success ? "Link de pago generado" : "Error al generar el link de pago"}
                        </h2>

                        <p className="new-text text-[var(--secondary)] text-center">
                            {saleResult.message}
                        </p>

                        {/* Detalles */}
                        <div className="w-full flex-col gap-3">
                            <div className="w-full flex justify-between">
                                <p className="new-text text-[var(--secondary)] text-center"><strong>Subtotal:</strong></p>
                                <p className="new-text text-[var(--secondary)] text-center">$ {saleResult.data?.subtotal}</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <p className="new-text text-[var(--secondary)] text-center"><strong>Total:</strong></p>
                                <p className="new-text text-[var(--secondary)] text-center">$ {saleResult.data?.total}</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <p className="new-text text-[var(--secondary)] text-center"><strong>Método:</strong></p>
                                <p className="new-text text-[var(--secondary)] text-center">{saleResult.data?.metodoPagoNombre}</p>
                            </div>
                            <div className="w-full flex-col gap-2 justify-between">
                                <p className="new-text text-[var(--secondary)] text-center"><strong>Link:</strong></p>
                                <p className="new-text text-[var(--secondary)] text-center break-all">{saleResult.data?.pse?.linkPago}</p>
                            </div>
                        </div>
                        {saleResult.data?.pse?.linkPago ? (
                            <div className="flex gap-3 w-full justify-center">
                                <button onClick={handleCopy} className="bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style rounded-md transition-transform">
                                    Copiar link
                                </button>
                                <a href={saleResult.data?.pse?.linkPago} target="_blank" rel="noopener noreferrer" className="bg-[var(--secondary)] text-white font-bold btn-style rounded-md transition-transform">
                                    Abrir link
                                </a>
                            </div>
                        ) : (
                            <p className="text-red-500 font-medium">
                                No se generó link de pago.
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
