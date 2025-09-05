/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from "next/image";
import { useState } from "react";
import ResultModal from "../modals/ResultModal";
import Alert from "../AlertValidate";
import PriceModal from "../modals/PriceModal";
import { useSoatApi } from "@/hooks/UseSoatApi";
import { useDisableScroll } from "@/hooks/DisableScroll";
import { DataResponse } from "@/types/ConsultaData";
import { CuponDataResponse } from "@/types/CuponData";
import DataModal from "../modals/DataModal";
import { PaymentMethodResponse } from "@/types/PaymentMethodData";

const advantages = [
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 10.png',
        title: 'Gana dinero extra con tu SOAT',
        desc: 'Al comprar el SOAT, acumulas un % de la compra y recibes un código. Compártelo con tus contactos y gana en cada venta. ¡Entre más compartas, tu próximo SOAT puede ser GRATIS!'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 01.png',
        title: 'Cómpralo en minutos desde tu celular',
        desc: 'Sin vueltas, ni papeleo. Lo que necesitas, cuando lo necesitas.'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 03.png',
        title: 'Esta compra apoya a un tendero colombiano',
        desc: 'Cada SOAT vendido representa un ingreso para miles de tenderos.'
    },
    {
        icon: '/images/icons/WEB SOAT ICO_ICO 02.png',
        title: 'Respaldado por aseguradoras autorizadas',
        desc: 'Tu compra está protegida. Recibe tu SOAT válido y verificado.'
    }
];

export default function Advantages() {

    const [openRequestOneModal, setRequestOneModal] = useState(false);
    const [consultData, setConsultData] = useState<DataResponse | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [cuponData, setCuponData] = useState<CuponDataResponse | null>(null);
    const [showLastModal, setShowLastModal] = useState(false);
    const [dataPaymentMethods, setDataPaymentMethods] = useState<PaymentMethodResponse | null>(null);


    const { consultarSoat, error, cuponValidate, loading, actualizarHomologacion, paymentMethods, clientUpdate, saveSale, setError } = useSoatApi();

    useDisableScroll(openRequestOneModal);
    useDisableScroll(showResultModal);
    useDisableScroll(showLastModal);

    const handleConsultaSubmit = async (data: { placa: string; tipoDoc: string; numeroDoc: number }) => {
        const result = await consultarSoat(data);
        if (!result) {
            setConsultData(null);
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
            return;
        }
        setConsultData(result);
        setRequestOneModal(false);
        setShowResultModal(true);
    };


    const validateCupon = async (data: { consultaId: string; cupon: string; clienteId: string }) => {
        const result = await cuponValidate(data);
        if (!result) {
            setShowError(true);
            setCuponData(null);
            setTimeout(() => setShowError(false), 4000);
            return;
        }
        setCuponData(result);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        setShowLastModal(false);
        setCuponData(null);
        setDataPaymentMethods(null);
    }

    const handlePurchaseSubmit = async () => {
        const result = await paymentMethods();
        setDataPaymentMethods(result);
        setShowResultModal(false);
        setShowLastModal(true);
    }

    const handleFinalSubmit = async (payload: any) => {
        try {
            const clientRes = await clientUpdate(payload.clienteId, {
                nombres: payload.nombres,
                apellidos: payload.apellidos,
                telefono: payload.telefono,
                correo: payload.correo,
                sexo: payload.sexo,
                idCiudad: payload.idCiudad,
                idDepartamento: payload.idDepartamento,
                direccion: payload.direccion,
            });

            if (!clientRes?.success) {
                setError("No se pudo actualizar el cliente");
                return;
            }

            const saleRes = await saveSale({
                consultaId: payload.consultaId,
                cupon: payload.cupon,
                clienteId: payload.clienteId,
                metodoPagoId: payload.metodoPagoId,
            });

            if (!saleRes?.success) {
                setError("No se pudo registrar la venta");
                return;
            }

        } catch (error) {
            setError("Ocurrió un error inesperado");
        }
    };

    return (
        <section className="w-full flex flex-col items-center">
            <Alert
                show={showError}
                message={error}
            />

            <PriceModal
                isOpen={openRequestOneModal}
                onClose={() => setRequestOneModal(false)}
                onSubmit={handleConsultaSubmit}
            />

            <ResultModal
                isOpen={showResultModal}
                onClose={handleCloseResultModal}
                data={consultData}
                cupon={validateCupon}
                cuponData={cuponData}
                actualizarHomologacion={actualizarHomologacion}
                loading={loading}
                onSubmit={handlePurchaseSubmit}
            />

            <DataModal
                isOpen={showLastModal}
                onClose={handleCloseResultModal}
                onSubmit={handleFinalSubmit}
                loading={loading}
                data={consultData}
                dataCupon={cuponData}
                paymentMethods={dataPaymentMethods}
            />
            <div className="w-full flex flex-col justify-center items-center gap-15 h-3/6 bg-white p-adv">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-20 gap-y-5 w-5/6 md:w-full lg:w-[95%] h-full card-advantages">
                    {advantages.map((advantge, index) => (
                        <div key={index} className="w-full md:w-[30%] lg:w-1/3 bg-[var(--secondary)] rounded-2xl flex flex-col items-center gap-2 p-card-adv hover:scale-101 transition-all duration-200 p-1">
                            <Image src={advantge.icon} alt="" width={40} height={40} className="w-[40px] md:w-[60px] lg:w-[70px]"></Image>
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
                        <button type="button" className="p-btn w-full rounded-2xl font-bold text-lg md:text-lg lg:text-3xl bg-white text-[var(--secondary)] outline-0 p-btn cursor-pointer hover:scale-90 transition-all duration-200 btn-loop" onClick={() => setRequestOneModal(true)}>Cotiza tu SOAT con Practi</button>
                    </div>

                </div>
            </div>
        </section>
    );

}