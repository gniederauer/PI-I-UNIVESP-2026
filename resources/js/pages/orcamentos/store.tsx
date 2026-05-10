import { Form, Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { index, store } from '@/routes/orcamentos';
import { TipoMaterial } from '@/types/tipoMaterial';
import { Formato } from '@/types/formato';
import { GramaturaPapel } from '@/types/gramaturaPapel';
import { CoresImpressao } from '@/types/coresImpressao';
import { TipoPapel } from '@/types/tipoPapel';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import FileUpload from '@/components/file-upload';
import InputError from '@/components/input-error';

type TipoMaterialComFormatos = TipoMaterial & { formatos: Formato[] };

const booleanOptions = [
    { value: '1', label: 'Sim' },
    { value: '0', label: 'Não' },
];

export default function Store({
    tiposMaterial,
    gramaturasPapel,
    coresImpressao,
    tiposPapel,
}: {
    tiposMaterial: TipoMaterialComFormatos[];
    gramaturasPapel: GramaturaPapel[];
    coresImpressao: CoresImpressao[];
    tiposPapel: TipoPapel[];
}) {
    const [tipoMaterialId, setTipoMaterialId] = useState('');
    const [formatoId, setFormatoId] = useState('');
    const [gramaturaPapelId, setGramaturaPapelId] = useState('');
    const [coresImpressaoId, setCoresImpressaoId] = useState('');
    const [tipoPapelId, setTipoPapelId] = useState('');
    const [precisaCriacao, setPrecisaCriacao] = useState('1');
    const [possuiArte, setPossuiArte] = useState('0');

    const formatosDisponiveis = useMemo(() => {
        const tipo = tiposMaterial.find((t) => String(t.id) === tipoMaterialId);
        return tipo?.formatos ?? [];
    }, [tipoMaterialId, tiposMaterial]);

    return (
        <>
            <Head title="Editar Orçamento" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-xl font-bold tracking-tight mb-4">Novo Orçamento</h1>
                </div>

                <Form
                    {...store.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardTitle className="p-4 pb-0">Dados do orçamento</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2 pt-6">
                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="observacoes">Observações</Label>
                                        <Input
                                            id="observacoes"
                                            name="observacoes"
                                            defaultValue={''}
                                        />
                                        <InputError message={errors.observacoes} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardTitle className="p-4 pb-0">Material</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="material_tipo_material_id">Tipo de material</Label>
                                        <input
                                            type="hidden"
                                            name="material_tipo_material_id"
                                            value={tipoMaterialId}
                                        />
                                        <Select value={tipoMaterialId} onValueChange={(v) => { setTipoMaterialId(v); setFormatoId(''); }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tiposMaterial.map((tipo) => (
                                                    <SelectItem key={tipo.id} value={String(tipo.id)}>
                                                        {tipo.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.material_tipo_material_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_formato_id">Formato</Label>
                                        <input
                                            type="hidden"
                                            name="material_formato_id"
                                            value={formatoId}
                                        />
                                        <Select value={formatoId} onValueChange={setFormatoId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {formatosDisponiveis.map((formato) => (
                                                    <SelectItem key={formato.id} value={String(formato.id)}>
                                                        {formato.descricao}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.material_formato_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_gramatura_papel_id">Gramatura do papel</Label>
                                        <input
                                            type="hidden"
                                            name="material_gramatura_papel_id"
                                            value={gramaturaPapelId}
                                        />
                                        <Select value={gramaturaPapelId} onValueChange={setGramaturaPapelId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {gramaturasPapel.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.gramatura}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.material_gramatura_papel_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_cores_impressao_id">Cores de impressão</Label>
                                        <input
                                            type="hidden"
                                            name="material_cores_impressao_id"
                                            value={coresImpressaoId}
                                        />
                                        <Select value={coresImpressaoId} onValueChange={setCoresImpressaoId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {coresImpressao.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.descricao}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.material_cores_impressao_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_tipo_papel_id">Tipo de papel</Label>
                                        <input
                                            type="hidden"
                                            name="material_tipo_papel_id"
                                            value={tipoPapelId}
                                        />
                                        <Select value={tipoPapelId} onValueChange={setTipoPapelId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tiposPapel.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.material_tipo_papel_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_quantidade">Quantidade</Label>
                                        <Input
                                            id="material_quantidade"
                                            name="material_quantidade"
                                            type="number"
                                            defaultValue={1}
                                        />
                                        <InputError message={errors.material_quantidade} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardTitle className="p-4 pb-0">Arte</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2 pt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="arte_precisa_criacao">Precisa de criação?</Label>
                                        <input
                                            type="hidden"
                                            name="arte_precisa_criacao"
                                            value={precisaCriacao}
                                        />
                                        <Select value={precisaCriacao} onValueChange={setPrecisaCriacao}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {booleanOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.arte_precisa_criacao} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="arte_possui_arte">Possui arte?</Label>
                                        <input
                                            type="hidden"
                                            name="arte_possui_arte"
                                            value={possuiArte}
                                        />
                                        <Select value={possuiArte} onValueChange={setPossuiArte}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {booleanOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.arte_possui_arte} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label>Arquivo</Label>
                                        <FileUpload
                                            nome="arte_arquivo"
                                            mimes=".ai,.psd,.png,.svg"
                                            arquivoSelecionado={undefined}
                                            erro={errors.arte_arquivo}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    Salvar
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Store.layout = {
    breadcrumbs: [
        {
            title: 'Orçamentos',
            href: index(),
        },
        {
            title: 'Novo',
        },
    ],
};
