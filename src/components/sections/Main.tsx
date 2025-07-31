'use client';

import Image from "next/image";
import { useState } from "react";
import PriceModal from "../modals/PriceModal";
import { useDisableScroll } from "@/hooks/DisableScroll";

export default function Main() {

    const [openRequestOneModal, setRequestOneModal] = useState(false);
    // const [openRequestTwoModal, setRequestTwoModal] = useState(false);

    
    const openConsulta = () => setRequestOneModal(true);
    useDisableScroll(openRequestOneModal);

    return (
        <section className="w-full h-screen md:h-[600px] lg:h-screen flex flex-col items-center">
            <PriceModal isOpen={openRequestOneModal} onClose={() => setRequestOneModal(false)}></PriceModal>
            <div className="w-full absolute h-full md:h-[38%] lg:h-[70%] bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]"/>
            <div className="w-full flex justify-center h-full md:h-5/6 bg-white">
                <Image src="/images/practi/WEB SOAT ICO_ICO 16.png" alt="Logo practisistemas" className="w-[120px] md:w-[170px] lg:w-[210px] absolute left-1/10 md:left-1/30 lg:left-1/10 top-3 md:top-1 lg:top-3 z-20 hidden md:flex" width={210} height={100}></Image>
                <Image src="/images/practi/WEB SOAT ICO_ICO 17.png" alt="Logo practisistemas" className="w-[120px] md:w-[170px] lg:w-[210px] absolute left-1/10 md:left-1/30 lg:left-1/10 top-3 md:top-1 lg:top-3 z-20 flex md:hidden" width={210} height={100}></Image>
                <div className="flex justify-center items-center w-full md:w-[95%] lg:w-[80%] h-full md:h-11/12 bg-white relative top-0 md:top-30 lg:top-40 rounded-0 md:rounded-4xl shadow-md border-3 border-white">
                    <Image src="/images/driver-soat.jpg" alt="Car driver" fill className="object-cover rounded-0 md:rounded-4xl" priority />
                    <div className="w-3/5 md:w-2/5 z-10 flex flex-col gap-3 h-fit p-box-one absolute left-0 bottom-3/7 md:bottom-1/3">
                        <h1 className="text-[var(--secondary)] text-xl md:text-2xl lg:text-4xl font-extrabold">¡Renueva tu SOAT fácil, rápido y 100% seguro con Practi!</h1>
                        <p className="text-[var(--secondary)] text-1xl md:text-xl lg:text-3xl font-bold">
                            Hazlo desde tu celular o computador, sin enredos.Tu póliza llegará a tu email y WhatsApp.
                        </p>
                    </div>
                    <div className="w-4/5 z-10 flex flex-col-reverse md:flex-row justify-center gap-2 md:gap-2 lg:gap-3 h-fit bg-white rounded-2xl shadow-lg border-3 border-[var(--primary)] p-box-two absolute bottom-[-5%] md:bottom-[-14%] lg:bottom-[-11%]">
                        <p className="text-center text-[var(--secondary)] w-full md:w-3/5 text-xl md:text-2xl lg:text-3xl font-bold">Ingresa los datos de tu vehículo y cotiza tu SOAT</p>
                        <button type="button" className="bg-[var(--primary)] text-[var(--secondary)] text-1xl md:text-xl lg:text-2xl outline-0 font-extrabold p-btn rounded-2xl cursor-pointer hover:scale-90 transition-all duration-200 btn-loop" onClick={openConsulta}>¡COTIZA GRATIS!</button>
                    </div>
                </div>
            </div>
        </section>
    );
}