'use client';

import { useDisableScroll } from "@/hooks/DisableScroll";
import { useSoatApi } from "@/hooks/UseSoatApi";
import { ValidateCuponData } from "@/types/ValidateCuponData";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import Alert from "../AlertValidate";
import ValidateCuponModal from "../modals/ValidateCuponModal";

const identificactionTypes = [
    {
        id: 1,
        name: 'Cédula de Ciudadania',
        pref: 'C'
    },
    {
        id: 2,
        name: 'NIT',
        pref: 'NIT'
    }
];

export default function Points() {

    const [selected, setSelected] = useState(identificactionTypes[0]);
    const [consultCuponModal, setConsultCuponModal] = useState<ValidateCuponData | null>(null);
    const [numeroDoc, setNumeroDoc] = useState('');
    const [openRequestCuponModal, setRequestCuponModal] = useState(false);
    const [showError, setShowError] = useState(false);

    const { cuponDataValidate, error, loading } = useSoatApi();

    useDisableScroll(openRequestCuponModal);

    const handleConsult = async (data: { identification: string }) => {
        const result = await cuponDataValidate(data);
        if (!result) {
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
        }
        setConsultCuponModal(result)
        setRequestCuponModal(true);
    }

    const handleNumeroDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroDoc(e.target.value);
    }

    const handleCloseModal = () => {
        setConsultCuponModal(null);
        setRequestCuponModal(false);
    }

    return (
        <section id="points" className="w-full flex flex-col-reverse md:flex-row">
            <Alert
                show={showError}
                message={error}
            />
            <ValidateCuponModal
                isOpen={openRequestCuponModal}
                onClose={handleCloseModal}
                loading={loading}
                data={consultCuponModal}
            />
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
                                                        `cursor-pointer select-none input-style flex items-center text-sm ${active ? 'bg-[var(--bg-footer)] text-[var(--secondary)]' : 'text-[var(--secondary)]'
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

                            <input type="text" placeholder="Número de documento" className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:outline-none hover:ring-2 hover:ring-[var(--primary)]" required value={numeroDoc} onChange={handleNumeroDocChange}/>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="w-full h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                                    CAPTCHA SIMULADO
                                </div>
                            </div>
                            <button type="submit" className="bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style-points rounded-md hover:scale-95 transition-transform hover:cursor-pointer text-2xl" onClick={(e) => {
                                e.preventDefault();
                                handleConsult({ identification: numeroDoc });
                            }}>
                                CONSULTAR
                            </button>
                        </form>
                    </div>
                    <div className="w-full md:w-4/7 p-points text-white">
                        <ul className="flechas list-disc flex flex-col gap-2">
                            <li className="text-xl md:text-large lg:text-2xl">Cada vez que alguien compra su SOAT con tu código, ganas un porcentaje acumulable para tu próxima compra.</li>
                            <li className="text-xl md:text-large lg:text-2xl">Aquí puedes consultar cuántas ventas has logrado gracias a tus referidos.</li>
                            <li className="text-xl md:text-large lg:text-2xl"><b>¡Comparte tu código y acumula %!</b> <br /> ¡Entre más referidos tengas, más cerca estás de obtener tu próximo SOAT gratis!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );

}