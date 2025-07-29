'use client';

import Image from "next/image";

const advantages = [
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 10.png',
        title: 'Gana dinero extra con tu SOAT',
        desc: 'Al comprar el SOAT, acumulas un % de la compra y recibes un código. Compártelo con tus contactos y gana en cada venta. ¡Entre más compartas, tu próximo SOAT puede ser GRATIS!'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 01.png',
        title: 'Cómpralo en minutos desde tu celular',
        desc: 'Sin vueltas, ni papeleo, Lo que necesitas, cuando lo necesitas'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 02.png',
        title: 'Respaldado por aseguradoras autorizadas',
        desc: 'Tu compra está protegida. Recibe tu SOAT válido y verificado'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 03.png',
        title: 'Esta compra apoya a un tendero colombiano',
        desc: 'Cada SOAT vendido representa un ingreso para miles de tenderos.'
    },
];

export default function Advantages() {

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col justify-center items-center gap-15 h-3/6 bg-white p-adv">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-20 gap-y-5 w-5/6 md:w-full lg:w-[95%] h-full card-advantages">
                    {advantages.map((advantge, index) => (
                        <div key={index} className="w-full md:w-[30%] lg:w-1/3 bg-[var(--secondary)] rounded-2xl flex flex-col items-center gap-2 p-card-adv hover:scale-101 transition-all duration-200 p-1">
                            <Image src={advantge.icon} alt="" width={70} height={70} className="w-[40px] md:w-[60px] lg:w-[70px]"></Image>
                            <h1 className="text-white font-bold text-center text-lg md:text-xl lg:text-2xl">{advantge.title}</h1>
                            <p className="text-white text-center text-lg md:text-xl lg:text-2xl">{advantge.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-end items-center w-5/6 md:w-[95%] lg:w-[80%] bg-[var(--primary)] rounded-4xl driver">
                    <div className="w-full md:w-2/4 flex flex-col items-center gap-2 md:gap-4 p-box-two">
                        <h1 className="text-[var(--secondary)] font-bold text-center text-lg md:text-2xl lg:text-3xl rounded-2xl text-balance text-outline-white">Miles de personas ya renovaron su SOAT</h1>
                        <div className="w-full flex justify-evenly">
                            <Image src="/images/icons/WEB SOAT ICO_ICO 07.png" alt="Iconos soat 1" width={80} height={80} className="w-[50px] md:w-[60px] lg:w-[80px]"></Image>
                            <Image src="/images/icons/WEB SOAT ICO_ICO 08.png" alt="Iconos soat 2" width={80} height={80} className="w-[50px] md:w-[60px] lg:w-[80px]"></Image>
                            <Image src="/images/icons/WEB SOAT ICO_ICO 09.png" alt="Iconos soat 3" width={80} height={80} className="w-[50px] md:w-[60px] lg:w-[80px]"></Image>
                        </div>
                        <button type="button" className="p-btn w-full rounded-2xl font-bold text-lg md:text-lg lg:text-3xl bg-white text-[var(--secondary)] outline-0 p-btn cursor-pointer hover:scale-90 transition-all duration-200">Cotiza tu SOAT con Practi</button>
                    </div>

                </div>
            </div>
        </section>
    );

}