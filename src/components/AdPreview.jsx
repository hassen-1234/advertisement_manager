import React, { forwardRef } from 'react';

// Helper to darken/lighten hex color
const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const AdPreview = forwardRef(({ selectedIds, allServices }, ref) => {
    const servicesList = allServices || [];
    const selectedServices = servicesList.filter(s => selectedIds.includes(s.id));

    return (
        <div className="shadow-2xl transition-transform duration-300 transform origin-top scale-[0.35] mb-[-400px] sm:scale-50 sm:mb-[-300px] lg:scale-100 lg:mb-0">
            <div
                ref={ref}
                className="w-[800px] h-[600px] bg-gradient-to-br from-white to-[#f0f2f5] text-[#1a1a1a] p-8 flex flex-col justify-between rounded shadow-none relative overflow-hidden"
            >
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-[#9089fc]"></div>

                <div className="text-center mt-4">
                    <h1 className="text-6xl m-0 mb-3 text-[#111] uppercase tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-br from-[#111] to-[#444]">
                        خدمات الشحن
                    </h1>
                    <p className="text-xl text-[#555] font-light m-0 tracking-wide">
                        أسعار منخفضة
                    </p>
                </div>

                {/* Dynamic Grid Layout Logic */}
                {(() => {
                    const count = selectedServices.length;
                    let gridCols = 'grid-cols-3';
                    let gap = 'gap-6';
                    let cardHeight = 'h-[155px]';
                    let iconSize = 'text-5xl';
                    let titleSize = 'text-lg';
                    let padding = 'p-4';
                    let marginTop = 'mt-6';

                    if (count === 4) {
                        gridCols = 'grid-cols-2';
                        gap = 'gap-4';
                        cardHeight = 'h-[135px]';
                        iconSize = 'text-5xl';
                        titleSize = 'text-lg';
                        padding = 'p-4';
                    } else if (count > 4 && count <= 6) {
                        gridCols = 'grid-cols-3';
                        gap = 'gap-4';
                        cardHeight = 'h-[135px]';
                        iconSize = 'text-4xl';
                        titleSize = 'text-base';
                        padding = 'p-3';
                    } else if (count > 6 && count <= 8) {
                        gridCols = 'grid-cols-4';
                        gap = 'gap-3';
                        cardHeight = 'h-[125px]';
                        iconSize = 'text-3xl';
                        titleSize = 'text-sm';
                        padding = 'p-2';
                    } else if (count > 8 && count <= 12) {
                        gridCols = 'grid-cols-4';
                        gap = 'gap-2';
                        cardHeight = 'h-[95px]'; // Reduced height to fit 3 rows
                        iconSize = 'text-2xl';
                        titleSize = 'text-xs';
                        padding = 'p-1';
                        marginTop = 'mt-4';
                    } else if (count > 12) {
                        gridCols = 'grid-cols-5';
                        gap = 'gap-2';
                        cardHeight = 'h-[85px]';
                        iconSize = 'text-xl';
                        titleSize = 'text-[10px]';
                        padding = 'p-1';
                        marginTop = 'mt-2';
                    }

                    return (
                        <div className={`grid ${gridCols} ${gap} ${marginTop} px-4`}>
                            {selectedServices.map(service => (
                                <div
                                    key={service.id}
                                    className={`flex flex-col items-center justify-center text-center ${cardHeight} w-full ${padding} rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:scale-105 border border-white/20 relative overflow-hidden group`}
                                    style={{
                                        background: `linear-gradient(145deg, ${service.color}, ${adjustColor(service.color, -20)})`,
                                        color: 'white'
                                    }}
                                >
                                    {/* Glass shine effect */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                                    <div className={`${iconSize} mb-1 drop-shadow-lg transform group-hover:-translate-y-1 transition-transform`}>
                                        {service.icon}
                                    </div>
                                    <div className={`font-black ${titleSize} text-white drop-shadow-md leading-tight tracking-wide z-10`}>
                                        {service.title}
                                    </div>
                                </div>
                            ))}
                            {selectedServices.length === 0 && (
                                <div className="col-span-3 text-center text-[#999] p-8 border-2 border-dashed border-[#e5e7eb] rounded-2xl bg-white/50 backdrop-blur-sm">
                                    <span className="text-lg font-medium">اختر الخدمات من القائمة الجانبية لإضافتها هنا</span>
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* Footer Section - Contact & Payment */}
                <div className="mt-auto w-full pt-6 border-t border-[#e5e7eb]">
                    <div className="flex justify-between items-end">
                        {/* Left Side: PAYMENT APPS */}
                        <div className="flex flex-col gap-3">
                            {/* Group 1: 27... with Sedad & Bankily */}
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-[#333]">رقم الحسابين</span>
                                <div className="px-2 py-1 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center h-8 min-w-[60px]">
                                    <img src="/sedad.png" alt="Sedad" className="h-full object-contain" />
                                </div>
                                <div className="px-2 py-1 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center h-8 min-w-[60px]">
                                    <img src="/bankily.png" alt="Bankily" className="h-full object-contain" />
                                </div>
                            </div>

                            {/* Group 2: 44... with Click & Bcipay */}
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-[#333]">رقم الحسابين</span>
                                <div className="px-2 py-1 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center h-8 min-w-[60px]">
                                    <img src="/click.png" alt="Click" className="h-full object-contain" />
                                </div>
                                <div className="px-2 py-1 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center h-8 min-w-[60px]">
                                    <img src="/IMG-20251030-WA0007.jpg" alt="Bcipay" className="h-full object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: CONTACT */}
                        <div className="flex flex-col gap-3 items-end">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-[#333]">رقم واتساب</span>
                                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white p-1.5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-[#333]">حساب سناب شات</span>
                                <div className="w-8 h-8 flex items-center justify-center p-0 rounded-lg overflow-hidden border border-gray-100">
                                    <img src="/snapchat.png" alt="Snapchat" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AdPreview;
