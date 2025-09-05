/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSoatApi } from "@/hooks/UseSoatApi";
import { DataResponse } from "@/types/ConsultaData";
import { PaymentMethodResponse } from "@/types/PaymentMethodData";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CuponDataResponse } from "@/types/CuponData";

const gener = [
    {
        id: 1,
        name: 'Femenino',
        pref: 'F'
    },
    {
        id: 2,
        name: 'Masculino',
        pref: 'M'
    }
];

function ValidatedInput({ value, onChange, placeholder, maxLength, minLength, filter, ...props }: {
    value: string; onChange: (v: string) => void; placeholder: string; maxLength?: number; minLength?: number; filter: (v: string) => string;[key: string]: unknown;
}) {
    return (
        <div className="w-full">
            <input
                {...props}
                type="text"
                placeholder={placeholder}
                className={`w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                value={value}
                maxLength={maxLength}
                minLength={minLength}
                onChange={e => {
                    const filtered = filter(e.target.value);
                    onChange(filtered);
                }}
            />
        </div>
    );
}

export default function DataModal({ isOpen, onClose, onSubmit, loading, data, dataCupon, paymentMethods }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: any) => void;
    loading: boolean;
    data: DataResponse | null;
    dataCupon: CuponDataResponse | null;
    paymentMethods: PaymentMethodResponse | null;
}) {

    const { departments, citiesByDepartment } = useSoatApi();
    const [deptos, setDeptos] = useState<any[]>([]);
    const [ciudades, setCiudades] = useState<any[]>([]);
    const [selectedDepto, setSelectedDepto] = useState<any | null>(null);
    const [selectedCiudad, setSelectedCiudad] = useState<any | null>(null);
    const [geners, setGeners] = useState<any[]>([]);
    const [selectedSex, setSelectedSex] = useState<any | null>(null);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState(data?.data?.propietario?.apellido || "");
    const [email, setEmail] = useState("");
    const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
    const [address, setAddress] = useState("");
    const [telefono, setTelefono] = useState<string>('');


    useEffect(() => {
        setGeners(gener);
        if (data?.data?.propietario) {
            setNombre(data.data.propietario.nombre || "");
            setApellido(data.data.propietario.apellido || "");
        }
    }, [data]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await departments();
            if (response?.success) {
                setDeptos(response.data);
            }
        };
        fetchDepartments();
    }, [departments]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedDepto) {
                const response = await citiesByDepartment(selectedDepto.id);
                if (response?.success) {
                    setCiudades(response.data);
                }
            }
        };
        fetchCities();
    }, [selectedDepto, citiesByDepartment]);

    const handleNumeroTelefono = (value: string) => {
        setTelefono(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            nombres: nombre,
            apellidos: apellido,
            telefono: parseInt(telefono),
            correo: email,
            sexo: selectedSex?.pref,
            idCiudad: selectedCiudad?.id,
            idDepartamento: selectedDepto?.id,
            direccion: address,

            consultaId: data?.consultaId,
            cupon: dataCupon?.data.cupon || "",
            clienteId: data?.clienteId,
            metodoPagoId: selectedPayment?.id,
        };

        onSubmit(payload);
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-4xl w-[90%] md:w-[800px] max-h-[90%] min-h-[70%] p-modal shadow-lg relative flex flex-col gap-4 overflow-style">

                        {loading && (
                            <section className="dots-container rounded-4xl">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </section>
                        )}

                        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl hover:cursor-pointer">&times;</button>

                        <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" width={100} height={100} className="self-center"></Image>

                        <p className="text-[var(--secondary)] font-bold text-xl text-center"> Diligencia los datos </p>
                        <p className="new-text text-[var(--secondary)] text-center">Ingresa los datos exactamente como aparecen en la tarjeta de propiedad del vehículo.</p>
                        <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-3 gap-y-4 justify-center">
                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="name" className="text-[var(--secondary)] font-medium">Nombres</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nombres"
                                    className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="lastname" className="text-[var(--secondary)] font-medium">Apellidos</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    placeholder="Apellidos"
                                    className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="price" className="text-[var(--secondary)] font-medium">Sexo</label>
                                <div className="w-full">
                                    <Listbox value={selectedSex} onChange={setSelectedSex}>
                                        <div className="relative">
                                            <Listbox.Button className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:cursor-pointer transition-all">
                                                {selectedSex ? selectedSex.name : "Selecciona un genero"}
                                            </Listbox.Button>
                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" /></svg>
                                            </div>
                                            <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none">
                                                {geners.map((d) => (
                                                    <Listbox.Option
                                                        key={d.id}
                                                        value={d}
                                                        className={({ active, selected }) =>
                                                            `cursor-pointer select-none input-style flex items-center text-sm ${active ? "bg-[var(--bg-footer)] text-[var(--secondary)]" : "text-[var(--secondary)]"
                                                            } ${selected ? "font-bold" : ""}`
                                                        }
                                                    >
                                                        {d.name}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="placa" className="text-[var(--secondary)] font-medium">Placa Vehículo</label>
                                <p className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style p-2 bg-gray-50">
                                    {data?.data?.placa || "---"}
                                </p>
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="phone" className="text-[var(--secondary)] font-medium">Teléfono</label>
                                <ValidatedInput id="phone" value={telefono} onChange={handleNumeroTelefono} placeholder="Telefono" maxLength={10} minLength={10} filter={v => v.replace(/[^0-9]/g, '')} />

                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="documento" className="text-[var(--secondary)] font-medium">Número de documento</label>
                                <p className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style p-2 bg-gray-50">
                                    {data?.data?.tipoDocumento || "---"} - {data?.data?.documento || "---"}
                                </p>
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="depto" className="text-[var(--secondary)] font-medium">Departamento</label>
                                <div className="w-full">
                                    <Listbox value={selectedDepto} onChange={setSelectedDepto}>
                                        <div className="relative">
                                            <Listbox.Button className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:cursor-pointer transition-all">
                                                {selectedDepto ? selectedDepto.nombreDepartamento : "Selecciona un departamento"}
                                            </Listbox.Button>
                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" /></svg>
                                            </div>
                                            <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none">
                                                {deptos.map((d) => (
                                                    <Listbox.Option
                                                        key={d.codigoDane}
                                                        value={d}
                                                        className={({ active, selected }) =>
                                                            `cursor-pointer select-none input-style flex items-center text-sm ${active ? "bg-[var(--bg-footer)] text-[var(--secondary)]" : "text-[var(--secondary)]"
                                                            } ${selected ? "font-bold" : ""}`
                                                        }
                                                    >
                                                        {d.nombreDepartamento}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="city" className="text-[var(--secondary)] font-medium">Ciudad</label>
                                <div className="w-full">
                                    <Listbox value={selectedCiudad} onChange={setSelectedCiudad} disabled={!ciudades.length}>
                                        <div className="relative">
                                            <Listbox.Button className="appearance-none w-full text-left bg-white text-[var(--secondary)] border border-gray-300 rounded-md input-style focus:outline-none focus:ring-2 focus:ring-[var(--primary)] hover:cursor-pointer transition-all">
                                                {selectedCiudad ? selectedCiudad.nombreCiudad : "Selecciona una ciudad"}
                                            </Listbox.Button>
                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" /></svg>
                                            </div>
                                            <Listbox.Options className="border border-gray-300 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none">
                                                {ciudades.map((c) => (
                                                    <Listbox.Option
                                                        key={c.codigoDane}
                                                        value={c}
                                                        className={({ active, selected }) =>
                                                            `cursor-pointer select-none input-style flex items-center text-sm ${active ? "bg-[var(--bg-footer)] text-[var(--secondary)]" : "text-[var(--secondary)]"
                                                            } ${selected ? "font-bold" : ""}`
                                                        }
                                                    >
                                                        {c.nombreCiudad}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="email" className="text-[var(--secondary)] font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email (donde llegará tu SOAT)"
                                    className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="w-[49%] flex flex-col gap-2">
                                <label htmlFor="address" className="text-[var(--secondary)] font-medium">Dirección</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Dirección"
                                    className="w-full border border-gray-300 rounded-md text-[var(--secondary)] input-style"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>


                            {paymentMethods?.success && (
                                <div className="w-full flex justify-center gap-5">
                                    {paymentMethods?.data.map((payment) => (
                                        <div key={payment.id} className="flex flex-col items-center justify-center gap-2">
                                            <Image src={payment.nombre === 'Pago PSE' ? '/images/icons/WEB SOAT ICO_ICO 04.png' : '/images/icons/WEB SOAT ICO_ICO 06.png'} alt="Logo pago" width={80} height={80} />
                                            <div className="flex gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    id={payment.id}
                                                    checked={selectedPayment?.id === payment.id}
                                                    onChange={() => setSelectedPayment(payment)}
                                                />
                                                <label htmlFor={payment.id}>
                                                    {payment.nombre === 'Pago PSE' ? 'PSE' : 'Link'}
                                                </label>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`bg-[var(--primary)] text-[var(--secondary)] font-bold btn-style rounded-md transition-transform
                                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}
                                    ${(!selectedSex || !telefono || !selectedDepto || !selectedCiudad || !email || !address || !selectedPayment) ? 'opacity-50 pointer-events-none' : ''}
                                `}
                                disabled={loading || !selectedSex || !telefono || !selectedDepto || !selectedCiudad || !email || !address || !selectedPayment}
                            >
                                PAGAR AHORA
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
