import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { index, show, update } from '@/routes/orcamentos';
import { Orcamento, StatusOrcamento } from '@/types/orcamento';
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
import { ArrowLeftIcon } from 'lucide-react';

type TipoMaterialComFormatos = TipoMaterial & { formatos: Formato[] };

const statusOptions: { value: StatusOrcamento; label: string }[] = [
    { value: 1, label: 'Enviado' },
    { value: 2, label: 'Aprovado' },
    { value: 3, label: 'Em andamento' },
    { value: 4, label: 'Finalizado' },
];

const booleanOptions = [
    { value: '1', label: 'Sim' },
    { value: '0', label: 'Não' },
];

export default function Edit({
    orcamento,
    tiposMaterial,
    gramaturasPapel,
    coresImpressao,
    tiposPapel,
}: {
    orcamento: Orcamento;
    tiposMaterial: TipoMaterialComFormatos[];
    gramaturasPapel: GramaturaPapel[];
    coresImpressao: CoresImpressao[];
    tiposPapel: TipoPapel[];
}) {
    const [statusValue, setStatusValue] = useState(String(orcamento.status));
    const [tipoMaterialId, setTipoMaterialId] = useState(String(orcamento.material.tipo_material.id));
    const [formatoId, setFormatoId] = useState(String(orcamento.material.formato.id));
    const [gramaturaPapelId, setGramaturaPapelId] = useState(String(orcamento.material.gramatura_papel.id));
    const [coresImpressaoId, setCoresImpressaoId] = useState(String(orcamento.material.cores_impressao.id));
    const [tipoPapelId, setTipoPapelId] = useState(String(orcamento.material.tipo_papel.id));
    const [precisaCriacao, setPrecisaCriacao] = useState(orcamento.arte.precisa_criacao ? '1' : '0');
    const [possuiArte, setPossuiArte] = useState(orcamento.arte.possui_arte ? '1' : '0');

    const formatosDisponiveis = useMemo(() => {
        const tipo = tiposMaterial.find((t) => String(t.id) === tipoMaterialId);
        return tipo?.formatos ?? [];
    }, [tipoMaterialId, tiposMaterial]);

    return (
        <>
            <Head title="Editar Orçamento" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-xl font-bold tracking-tight mb-4">Editar Orçamento</h1>
                    <Link href={show({ orcamento: orcamento.id })}>
                        <Button variant="outline" size="sm">
                            <ArrowLeftIcon />
                            Voltar
                        </Button>
                    </Link>
                </div>

                <Form
                    {...update.form({ orcamento: orcamento.id })}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardTitle className="p-4 pb-0">Dados do orçamento</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2 pt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="valor_total">Valor total (R$)</Label>
                                        <Input
                                            id="valor_total"
                                            name="valor_total"
                                            type="text"
                                            inputMode="decimal"
                                            defaultValue={orcamento.valor_total}
                                        />
                                        <InputError message={errors.valor_total} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <input type="hidden" name="status" value={statusValue} />
                                        <Select value={statusValue} onValueChange={setStatusValue}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((option) => (
                                                    <SelectItem key={option.value} value={String(option.value)}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="observacoes">Observações</Label>
                                        <Input
                                            id="observacoes"
                                            name="observacoes"
                                            defaultValue={orcamento.observacoes}
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
                                            defaultValue={orcamento.material.quantidade}
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
                                            arquivoSelecionado={orcamento.arte.arquivo}
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

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Orçamentos',
            href: index(),
        },
        {
            title: 'Editar',
        },
    ],
};
