'use client';

import { useEffect, useState } from "react";

export default function Steps() {

    const steps = [
        {
            i: '1. ',
            title: 'Cotiza el SOAT',
            description:
            'Ingresa la placa de tu vehículo y algunos datos básicos. En segundos sabrás el valor exacto de tu SOAT.',
        },
        {
            i: '2. ',
            title: 'Revisa y paga',
            description:
                'Verifica que todo esté correcto y realiza el pago fácil y seguro PSE, QR o link de pago, como tú quieras.',
        },
        {
            i: '3. ',
            title: 'Recíbelo por correo',
            description:
                'Te lo enviamos en PDF a tu email, para que lo lleves contigo en todo momento. ¡Así de rápido, así de fácil!',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % steps.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                <div className="flex flex-col items-center justify-end gap-3 w-[95%] md:w-full lg:w-5/6 p-box-two">
                    <h1 className="text-white text-2xl text-center md:text-3xl ls:text-4xl font-extrabold"> Compra el SOAT con Practi, en solo 3 pasos:</h1>
                    <div className="bg-white w-full flex flex-col gap-3 rounded-2xl p-box-two p-box-two-step shadow-lg">
                        <div className="hidden relative w-full md:flex justify-around items-center">
                            <div className="absolute top-1/2 left-[15%] w-[70%] h-[2px] bg-[var(--primary)] z-0 transform -translate-y-1/2" />
                            {[1, 2, 3].map((number) => (
                                <div
                                    key={number}
                                    className="relative z-10 w-10 h-10 flex items-center justify-center bg-white border-3 border-[var(--primary)] text-[var(--secondary)] font-extrabold text-lg rounded-full"
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:flex justify-evenly gap-10 md:gap-2 lg:gap-10 p-box-step">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-3 p-box-two text-center ${index !== 0 ? 'border-l-2 border-[var(--primary)]' : ''
                                        } ${index === 1 ? 'p-box-two-steps' : ''}`}
                                >
                                    <h1 className="text-[var(--secondary)] text-2xl font-extrabold">{step.title}</h1>
                                    <p className="text-[var(--secondary)] text-lg">{step.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="block md:hidden relative w-full min-h-[220px] overflow-hidden">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 flex justify-center items-center transition-all duration-3000 ease-in-out transform ${index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'
                                        }`}
                                >
                                    <div className="w-[90%] text-center">
                                        <h1 className="text-[var(--secondary)] text-xl font-extrabold">{step.i} {step.title}</h1>
                                        <p className="text-[var(--secondary)] text-base mt-2">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}