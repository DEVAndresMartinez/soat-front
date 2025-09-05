export type ValidateCuponData = {
  success: boolean;
  message: string;
  data: {
    nombrePropietario: string;
    couponCodes: string[];
    totalUsos: number;
    fechasUso: string[];
  };
};
