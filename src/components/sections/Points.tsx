'use client';

import { Listbox } from "@headlessui/react";
import { useState } from "react";

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

export default function Points () {

        const [selected, setSelected] = useState(identificactionTypes[0]);
    

    return (
        <section className="w-full flex flex-col-reverse md:flex-row">
            <div className="w-full flex justify-center items-center bg-white p-points">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-10 w-[95%] md:w-[95%] lg:w-[80%] h-full bg-[var(--secondary)] rounded-4xl p-points">
                    <div className="w-full md:w-3/7 bg-white p-points rounded-3xl flex flex-col gap-3">
                        <h1 className="text-[var(--secondary)] text-center text-2xl font-extrabold">¿Cuántos SOAT has vendido con tu código?</h1>
                        <form className="flex flex-col items-center gap-3 w-full">
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
                            <button type="submit" className="bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style-points rounded-md hover:scale-95 transition-transform hover:cursor-pointer text-2xl">
                                CONSULTAR
                            </button>
                        </form>
                    </div>
                    <div className="w-full md:w-4/7 p-points text-white">
                        <ul className="flechas list-disc flex flex-col gap-2">
                            <li className="text-xl md:text-large lg:text-2xl">Cada vez que alguien compra su SOAT con tu código de promotor, ganas un porcentaje acumulable para tu próxima compra.</li>
                            <li className="text-xl md:text-large lg:text-2xl">Aquí puedes consultar cuántas ventas has logrado gracias a tus referidos.</li>
                            <li className="text-xl md:text-large lg:text-2xl"><b>¡Comparte tu código y acumula!</b> <br /> ¡Entre más referidos tengas, más cerca estás de obtener tu próximo SOAT completamente gratis!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );

}