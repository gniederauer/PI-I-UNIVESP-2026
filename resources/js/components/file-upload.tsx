import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { FileUploadProps } from '@/types';

export default function FileUpload({
    nome,
    mimes,
    erro,
    arquivoSelecionado,
    className,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={cn('grid gap-2', className)}>
            <input
                ref={inputRef}
                type="file"
                name={nome}
                accept={mimes}
                className="sr-only"
            />

            {arquivoSelecionado && (
                <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                    <a
                        href={arquivoSelecionado}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate underline underline-offset-2"
                    >
                        {arquivoSelecionado.split('/').pop()}
                    </a>
                </div>
            )}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
            >
                <Upload />
                Escolher arquivo
            </Button>

            <InputError message={erro} />
        </div>
    );
}
