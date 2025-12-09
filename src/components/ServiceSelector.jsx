import React from 'react';
import ServiceForm from './ServiceForm';

export default function ServiceSelector({ services, selectedIds, onToggle, onAddService }) {
    return (
        <div className="w-full md:w-[400px] bg-surface p-8 overflow-y-auto border-b border-[#2d2d35] md:border-b-0 md:border-l flex flex-col gap-6 max-h-[40vh] md:max-h-full h-auto md:h-full">
            <div className="mb-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-[#9089fc] bg-clip-text text-transparent m-0">
                    الخدمات
                </h2>
                <p className="text-text-muted mt-1 m-0">اختر الخدمات التي تريد عرضها</p>
            </div>

            <ServiceForm onAdd={onAddService} />

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {services.map((service) => {
                    const isSelected = selectedIds.includes(service.id);
                    return (
                        <div
                            key={service.id}
                            className={`
                                bg-[#272730] rounded-xl p-4 cursor-pointer transition-all duration-200 
                                border-2 flex flex-col items-center text-center gap-2 
                                hover:-translate-y-0.5 hover:bg-[#32323e]
                                ${isSelected ? 'border-primary bg-[rgba(100,108,255,0.1)]' : 'border-transparent'}
                            `}
                            onClick={() => onToggle(service.id)}
                        >
                            <div className="text-4xl">{service.icon}</div>
                            <div className="font-semibold text-sm">{service.title}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
