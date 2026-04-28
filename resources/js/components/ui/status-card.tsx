import React from 'react';

type StatusCardProps = React.PropsWithChildren<{ title: string; value: number }>;

function StatusCard({ title, value, children }: StatusCardProps) {
    return (
        <div className="rounded-[2px] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-medium text-gray-900 dark:text-white">{value}</p>
                </div>
                <div className="rounded-[2px] p-3 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}

export { StatusCard };