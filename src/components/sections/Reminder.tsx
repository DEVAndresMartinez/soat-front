/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from "next/image";
import PriceModal from "../modals/PriceModal";
import { useDisableScroll } from "@/hooks/DisableScroll";
import { useState } from "react";
import { useSoatApi } from "@/hooks/UseSoatApi";
import Alert from "../AlertValidate";
import { CuponDataResponse } from "@/types/CuponData";
import { DataResponse } from "@/types/ConsultaData";
import ResultModal from "../modals/ResultModal";
import DataModal from "../modals/DataModal";
import { PaymentMethodResponse } from "@/types/PaymentMethodData";
import SaleResultModal from "../modals/SaleResultModal";

export default function Reminder() {
    const [openRequestOneModal, setRequestOneModal] = useState(false);
    const [consultData, setConsultData] = useState<DataResponse | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [cuponData, setCuponData] = useState<CuponDataResponse | null>(null);
    const [showLastModal, setShowLastModal] = useState(false);
    const [dataPaymentMethods, setDataPaymentMethods] = useState<PaymentMethodResponse | null>(null);
    const [saleResult, setSaleResult] = useState<any | null>(null);
    const [showSaleModal, setShowSaleModal] = useState(false);
    
    
    const { consultarSoat, error, cuponValidate, loading, actualizarHomologacion, paymentMethods, clientUpdate, saveSale, setError } = useSoatApi();
    
    useDisableScroll(openRequestOneModal);
    useDisableScroll(showResultModal);
    useDisableScroll(showLastModal);

    useDisableScroll(showSaleModal);

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
        setShowLastModal(false)
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

            setShowLastModal(false);
            setSaleResult(saleRes);
            setShowSaleModal(true);

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
            <SaleResultModal
                isOpen={showSaleModal}
                onClose={() => setShowSaleModal(false)}
                saleResult={saleResult}
            />
            <div className="w-full flex flex-col gap-3 justify-center items-center h-3/6 bg-white p-adv">
                <div className="flex flex-col md:flex-row justify-evenly items-center gap-5 w-[90%] md:w-[95%] lg:w-[80%] h-full bg-[var(--primary)] rounded-2xl">
                    <div className="w-full md:w-[70%] lg:w-[70%] p-reminder">
                        <h1 className="text-[var(--secondary)] text-2xl md:text-3xl lg:text-4xl font-extrabold">¿Tu SOAT está por vencer? <br /> No lo dejes para después</h1>
                        <p className="text-[var(--secondary)] text-xl md:text-2xl lg:text-3xl">Hazlo en menos de 5 minutos y evita comparendos por más de $ 1´400.000</p>
                    </div>
                    <Image src="/images/Rectangle.png" alt="Imagen mujer con soat" width="200" height="300" className="scale-115 relative bottom-4 right-0 md:right-10 z-10"></Image>
                </div>
                <button type="button" className="p-btn rounded-2xl font-bold text-2xl bg-[var(--secondary)] text-white outline-0 p-btn cursor-pointer hover:scale-90 transition-all duration-200 btn-loop" onClick={() => setRequestOneModal(true)}>Cotiza y renueva ahora</button>
            </div>
        </section>
    );

}