/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataResponse } from "@/types/ConsultaData";
import { CuponDataResponse } from "@/types/CuponData";
import { PaymentMethodResponse } from "@/types/PaymentMethodData";
import { ValidateCuponData } from "@/types/ValidateCuponData";
import { useState, useCallback } from "react";

export function useSoatApi() {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getToken = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ api_key: process.env.NEXT_PUBLIC_API_SECRET_KEY }),
            });
            if (!response.ok) throw new Error("Error obteniendo token");
            const result = await response.json();
            setAuthToken(result.access_token);
            return result.access_token;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const ensureToken = useCallback(async () => {
        return authToken || (await getToken());
    }, [authToken, getToken]);

    const apiRequest = useCallback(
        async <T,>(
            url: string,
            options: RequestInit,
            transform?: (result: any) => T
        ): Promise<T | null> => {
            try {
                setLoading(true);
                setError(null);

                const token = await ensureToken();
                if (!token) throw new Error("No hay token de autenticación");

                const response = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        ...options.headers,
                    },
                });

                if (!response.ok) {
                    let errorMessage = `Error HTTP: ${response.status}`;
                    try {
                        const errorJson = await response.json();
                        errorMessage = errorJson?.message || errorMessage;
                    } catch {
                        // si no se puede parsear JSON, mantenemos el mensaje por defecto
                    }
                    throw new Error(errorMessage);
                }

                const result = await response.json();

                if (result.success === false) {
                    throw new Error(result.message || result?.data?.data?.reply || "Error en la consulta");
                }

                return transform ? transform(result) : result;
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
                return null; // 👈 evita que la app se rompa
            } finally {
                setLoading(false);
            }
        },
        [ensureToken]
    );


    // 🔹 Endpoints específicos
    const consultarSoat = useCallback(
        (data: { placa: string; tipoDoc: string; numeroDoc: number }) =>
            apiRequest<DataResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/soat/consultar/`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        placa: data.placa,
                        tipo_doc: data.tipoDoc,
                        cedula: data.numeroDoc,
                    }),
                },
                (result) => ({
                    success: result?.success,
                    message: result?.message,
                    placa: result?.placa,
                    cedula: result?.cedula,
                    consultaId: result?.consultaId,
                    clienteId: result?.clienteId,
                    data: {
                        comisionServicio: result?.data?.comisionServicio,
                        fechaInicioVigencia: result?.data?.fechaInicioVigencia,
                        fechaFinVigencia: result?.data?.fechaFinVigencia,
                        tipoDocumento: result?.data?.tipoDocumento,
                        placa: result?.data?.placa,
                        homologacion: result?.data?.homologacion,
                        documento: result?.data?.documento,
                        homologacionesEncontradas: result?.data?.homologacionesEncontradas,
                        vehiculo: result?.data?.vehiculo,
                        propietario: result?.data?.propietario,
                        ciudad: result?.data?.ciudad,
                        nombre: result?.data?.nombre,
                        apellido: result?.data?.apellido,
                    },
                    timestamp: result?.timestamp,
                    api_key_used: result?.api_key_used,
                })
            ),
        [apiRequest]
    );

    const actualizarHomologacion = useCallback(
        (data: { consultaId: string; homologacionId: string }) =>
            apiRequest(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/soat/actualizar-homologacion`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                }
            ),
        [apiRequest]
    );

    const cuponValidate = useCallback(
        (data: { consultaId: string; cupon: string; clienteId: string }) =>
            apiRequest<CuponDataResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/soat/validar-cupon`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                },
                (result) => ({
                    success: result?.success,
                    canApply: result?.canApply,
                    message: result?.message,
                    data: result?.data,
                    metadata: result?.metadata,
                })
            ),
        [apiRequest]
    );

    const cuponDataValidate = useCallback(
        (data: { identification: string }) =>
            apiRequest<ValidateCuponData>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/ventas/cupones/uso-por-documento`,
                {
                    method: "POST",
                    body: JSON.stringify({ documento: data.identification }),
                },
                (result) => ({
                    success: result?.success || false,
                    message:
                        result.detail?.includes("Cliente no encontrado")
                            ? "Cliente no encontrado"
                            : result?.message,
                    data: {
                        nombrePropietario: result?.data?.nombrePropietario,
                        couponCodes: result?.data?.couponCodes,
                        totalUsos: result?.data?.totalUsos,
                        fechasUso: result?.data?.fechasUso,
                    },
                })
            ),
        [apiRequest]
    );

    const paymentMethods = useCallback(() =>
        apiRequest<PaymentMethodResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/metodos-pago/activos`,
            {
                method: 'GET'
            },
            (result) => ({
                success: result?.success,
                data: result?.data
            })
        ),
        [apiRequest]
    );

    const departments = useCallback(() =>
        apiRequest<any>(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/departamentos`,
            {
                method: 'GET'
            },
            (result) => ({
                success: result?.success,
                data: result?.data
            })
        ),
        [apiRequest]
    );

    const citiesByDepartment = useCallback(
        (departmentId: string) =>
            apiRequest<any>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/departamentos/${departmentId}/ciudades`,
                {
                    method: 'GET'
                },
                (result) => ({
                    success: result?.success,
                    data: result?.data
                })
            ),
        [apiRequest]
    );

    const clientUpdate = useCallback(
        (cliente_id: string, data: {
            nombres: string;
            apellidos: string;
            telefono: number;
            correo: string;
            sexo: string;
            idCiudad: string;
            idDepartamento: string;
            direccion: string;
        }) =>
            apiRequest<any>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/clientes/${cliente_id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                },
                (result) => ({
                    success: result?.success,
                    data: result?.data
                })
            ),
        [apiRequest]
    );

    const saveSale = useCallback(
        (data: {
            consultaId: string;
            cupon: string;
            clienteId: string;
            metodoPagoId: string;
        }) =>
            apiRequest<any>(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/ventas`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                },
                (result) => ({
                    success: result?.success,
                    data: result?.data
                })
            ),
        [apiRequest]
    )

    return { authToken, loading, error, setError, getToken, consultarSoat, actualizarHomologacion, cuponValidate, cuponDataValidate, paymentMethods, departments, citiesByDepartment, clientUpdate, saveSale };
}