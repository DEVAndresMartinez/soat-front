import { DataResponse } from "@/types/ConsultaData";
import { CuponDataResponse } from "@/types/CuponData";
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ api_key: process.env.NEXT_PUBLIC_API_SECRET_KEY }),
            });
            if (!response.ok) throw new Error('Error obteniendo token');
            const result = await response.json();
            setAuthToken(result.access_token);
            return result.access_token;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const consultarSoat = useCallback(async (data: { placa: string; tipoDoc: string; numeroDoc: string }) => {
        setLoading(true);
        setError(null);
        try {
            const token = authToken || await getToken();
            if (!token) throw new Error('No hay token de autenticación');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/soat/consultar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    placa: data.placa,
                    tipo_doc: data.tipoDoc,
                    cedula: data.numeroDoc,
                }),
            });
            if (!response.ok) throw new Error('Error en la consulta');
            const result = await response.json();
            if (result.success === false) {
                setError('Los datos ingresados son incorrectos. Por favor, verifica e intenta nuevamente.');
                return null;
            }
            const consultData: DataResponse = {
                success: result.success,
                message: result.message,
                placa: result.placa,
                cedula: result.cedula,
                consultaId: result.consultaId,
                clienteId: result.clienteId,
                data: {
                    success: result.data.success,
                    message: result.data.message,
                    data: {
                        comisionServicio: result.data.data.comisionServicio,
                        fechaInicioVigencia: result.data.data.fechaInicioVigencia,
                        fechaFinVigencia: result.data.data.fechaFinVigencia,
                        tipoDocumento: result.data.data.tipoDocumento,
                        placa: result.data.data.placa,
                        homologacion: result.data.data.homologacion,
                        documento: result.data.data.documento,
                        homologacionesEncontradas: result.data.data.homologacionesEncontradas,
                        vehiculo: result.data.data.vehiculo,
                        propietario: result.data.data.propietario,
                        ciudad: result.data.data.ciudad,
                        nombre: result.data.data.nombre,
                        apellido: result.data.data.apellido,
                    }
                },
                timestamp: result.timestamp,
                api_key_used: result.api_key_used,
            };
            return consultData;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, [authToken, getToken]);

    const actualizarHomologacion = useCallback(async (data: { consultaId: string; homologacionId: string }) => {
        setLoading(true);
        try {
            const token = authToken || await getToken();
            if (!token) throw new Error('No hay token de autenticación');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/soat/actualizar-homologacion`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    consultaId: data.consultaId,
                    homologacionId: data.homologacionId
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Error al actualizar homologación');
            setLoading(false);
            return result;

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error desconocido');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, [authToken, getToken]);

    const cuponValidate = useCallback(async (data: { consultaId: string; cupon: string; clienteId: string }) => {
        setLoading(true);
        setError(null);
        try {
            const token = authToken || await getToken();
            if (!token) throw new Error('No hay token de autenticación');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/soat/validar-cupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    consultaId: data.consultaId,
                    cupon: data.cupon,
                    clienteId: data.clienteId
                })
            });

            if (response.status === 404) {
                setError('Cupón no válido o no encontrado.');
                return null;
            } 

            const result = await response.json();
            const cuponData: CuponDataResponse = {
                success: result.success,
                canApply: result.canApply,
                message: result.message,
                data: result.data,
                metadata: result.metadata
            };
            return cuponData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error desconocido');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, [authToken, getToken]);

    return { authToken, loading, error, getToken, consultarSoat, setError, actualizarHomologacion, cuponValidate };
}