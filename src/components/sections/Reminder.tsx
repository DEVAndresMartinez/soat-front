'use client';

import Image from "next/image";

export default function Reminder() {

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col gap-3 justify-center items-center h-3/6 bg-white p-adv">
                <div className="flex flex-col md:flex-row justify-evenly items-center gap-5 w-[90%] md:w-[95%] lg:w-[80%] h-full bg-[var(--primary)] rounded-2xl">
                    <div className="w-full md:w-[70%] lg:w-[70%] p-reminder">
                        <h1 className="text-[var(--secondary)] text-2xl md:text-3xl lg:text-4xl font-extrabold">¿Tu SOAT está por vencer? <br /> No lo dejes para después</h1>
                        <p className="text-[var(--secondary)] text-xl md:text-2xl lg:text-3xl">Hazlo en menos de 5 minutos y evita comparendos por más de $ 1´400.000</p>
                    </div>
                    <Image src="/images/Rectangle.png" alt="Imagen mujer con soat" width="200" height="300" className="scale-115 relative bottom-4 right-0 md:right-10 z-10"></Image>
                </div>
            <button type="button" className="p-btn rounded-2xl font-bold text-2xl bg-[var(--secondary)] text-white outline-0 p-btn cursor-pointer hover:scale-90 transition-all duration-200">Cotiza y renueva ahora</button>
            </div>
        </section>
    );

}