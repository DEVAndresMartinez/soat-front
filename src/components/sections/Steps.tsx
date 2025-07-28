'use client';

export default function Steps() {

    const steps = [
        {
            title: 'Cotiza el SOAT',
            description:
                'Ingresa la placa de tu vehículo y algunos datos básicos. En segundos sabrás el valor exacto de tu SOAT.',
        },
        {
            title: 'Revisa y paga',
            description:
                'Verifica que todo esté correcto y realiza el pago fácil y seguro PSE, QR o link de pago, como tú quieras.',
        },
        {
            title: 'Recíbelo por correo',
            description:
                'Te lo enviamos en PDF a tu email, para que lo lleves contigo en todo momento. ¡Así de rápido, así de fácil!',
        },
    ];

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                <div className="flex flex-col items-center justify-end gap-3 w-5/6 p-box-two">
                    <h1 className="text-white text-4xl font-extrabold"> Compra el SOAT con Practi, en solo 3 pasos:</h1>
                    <div className="bg-white w-full flex flex-col gap-3 rounded-2xl p-box-two shadow-lg">
                        <div className="relative w-full flex justify-around items-center">
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
                        <div className="w-full flex justify-evenly gap-10">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-3 p-box-two text-center ${index !== 0 ? 'border-l-2 border-[var(--primary)]' : ''
                                        }`}
                                >
                                    <h1 className="text-[var(--secondary)] text-2xl font-extrabold">
                                        {step.title}
                                    </h1>
                                    <p className="text-[var(--secondary)] text-lg">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}