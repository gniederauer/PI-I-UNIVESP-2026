import { TipoMaterial } from "./tipoMaterial";

export type Formato = {
    id: number;
    descricao: string;
    tipo_materiais: TipoMaterial;
};
