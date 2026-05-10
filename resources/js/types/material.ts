import { Formato } from "./formato";
import { GramaturaPapel } from "./gramaturaPapel";
import { CoresImpressao } from "./coresImpressao";
import { TipoPapel } from "./tipoPapel";
import { TipoMaterial } from "./tipoMaterial";

export type Material = {
    id: number;
    quantidade: number;
    tipo_material: TipoMaterial;
    formato: Formato;
    gramatura_papel: GramaturaPapel;
    cores_impressao: CoresImpressao;
    tipo_papel: TipoPapel;
};
