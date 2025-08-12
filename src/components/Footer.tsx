'use client';

import Link from 'next/link';
import Image from 'next/image';

const socials = [
    {
        name: 'Facebook',
        url: 'https://web.facebook.com/people/Practi-Col/61577197485416/',
        icon: '/images/socials/WEB SOAT ICO_ICO 10.png'
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/c/Practi',
        icon: '/images/socials/WEB SOAT ICO_ICO 11.png'
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/company/somospracti/',
        icon: '/images/socials/WEB SOAT ICO_ICO 12.png'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/somospracti/',
        icon: '/images/socials/WEB SOAT ICO_ICO 13.png'
    },
    {
        name: 'Twitter',
        url: 'https://x.com/somospracti',
        icon: '/images/socials/WEB SOAT ICO_ICO 14.png'
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@somospracti',
        icon: '/images/socials/WEB SOAT ICO_ICO 15.png'
    }
];


export default function Footer() {

    return (
        <div className="w-full flex flex-col items-center justify-center gap-5 md:gap-10 bg-[var(--bg-footer)] p-footer">
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between gap-3 md:gap-8 lg:gap-14">
                <div className="flex w-full md:w-2/4 lg:w-1/3 flex-col gap-2 md:gap-4">
                    <h3 className="text-[var(--secondary)] font-extrabold text-lg">Nosotros</h3>
                    <p className="text-[var(--secondary)] text-lg"> Practi es una fintech con más de 15 años de experiencia en pagos digitales y tecnología financiera.
                    </p>
                    <p className="text-[var(--secondary)] text-lg">
                        Nuestra plataforma está respaldada por
                        una infraestructura robusta y un equipo
                        experto en corresponsalía bancaria,
                        medios de pago y soluciones digitales.
                    </p>
                </div>
                <div className="flex w-full md:w-auto lg:w-1/3 flex-col gap-4 text-lg">
                    <h3 className="text-[var(--secondary)] font-extrabold text-lg">Legal</h3>
                    <p className="text-[var(--secondary)] text-lg">
                        Tratamiento de datos personales
                        <br />
                        Términos y condiciones
                        <br />
                        Ética
                    </p>
                </div>
                <div className="flex w-full md:w-full lg:w-1/3 flex-col gap-2 md:gap-4">
                    <h3 className="text-[var(--secondary)] font-extrabold text-lg">Contacto</h3>
                    <p className="text-[var(--secondary)] text-lg">
                        Celular: + (57) 310 8197930
                    </p>
                    <p className="text-[var(--secondary)] text-lg">
                        Dirección: Km 1.5 vía Chía Cajicá
                        costado occidental, edificio Oxus centro
                        empresarial / oficinas 313 y 316
                    </p>
                    <p className="text-[var(--secondary)] text-lg">
                        servicioalcliente@practisistemas.com
                        pqr@practisistemas.com
                    </p>
                    <div className="w-full md:w-fit justify-around bg-[var(--secondary)] flex gap-2 md:gap-4 text-white rounded-md p-socials">
                        {socials.map((social, index) => (
                            <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-8 md:h-8 lg:w-6 lg:h-6 flex items-center justify-center rounded-full hover:bg-[var(--primary)] hover:scale-110 transition-all duration-200" aria-label={social.name}>
                                <Image src={social.icon} alt="" width={100} height={100} className="img-sociales"></Image>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
            <hr className="w-full border-t-3 border-[var(--primary)]" />
            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10">
                <Image className="w-15 md:w-25" src="/images/practi/WEB SOAT ICO_ICO 18.png" alt="" width={100} height={100}></Image>
                <p className="text-[var(--secondary)] w-full md:w-2/3 text-lg text-center md:text-left" >
                    Practi actúa como canal digital autorizado para la
                    emisión de SOAT a través de aseguradoras aliadas. <br />
                    &copy; Todos los derechos reservados.
                </p>
            </div>
        </div>
    );

}