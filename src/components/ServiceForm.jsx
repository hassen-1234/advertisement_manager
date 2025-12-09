import React, { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { readFile } from '@tauri-apps/plugin-fs';

export default function ServiceForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [imagePath, setImagePath] = useState(''); // Store the file path for display
    const [color, setColor] = useState('#646cff');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const handleSelectImage = async () => {
        try {
            const file = await open({
                multiple: false,
                directory: false,
                filters: [{
                    name: 'Images',
                    extensions: ['png', 'jpg', 'jpeg', 'svg', 'webp']
                }]
            });

            if (file) {
                setIsLoadingImage(true);
                setImagePath(file); // Set path for display input

                // Read the file as binary
                const content = await readFile(file);

                // Convert to Base64
                let binary = '';
                const bytes = new Uint8Array(content);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const base64 = btoa(binary);

                // Determine mime type
                const ext = file.split('.').pop().toLowerCase();
                let mime = 'image/png';
                if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
                if (ext === 'svg') mime = 'image/svg+xml';
                if (ext === 'webp') mime = 'image/webp';

                setIcon(`data:${mime};base64,${base64}`);
            }
        } catch (err) {
            console.error('Failed to load image', err);
            alert('فشل في تحميل الصورة');
        } finally {
            setIsLoadingImage(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !icon) return;

        onAdd({
            title,
            icon: icon.startsWith('data:') ? <img src={icon} alt="" className="w-[1em] h-[1em] object-contain" /> : icon,
            color
        });

        // Reset form
        setTitle('');
        setIcon('');
        setIsExpanded(false);
        setImagePath('');
    };

    if (!isExpanded) {
        return (
            <button
                className="bg-transparent text-primary w-full p-4 border border-dashed border-primary mb-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[rgba(100,108,255,0.1)] hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
                onClick={() => setIsExpanded(true)}
            >
                + إضافة خدمة جديدة
            </button>
        );
    }

    return (
        <div className="bg-gradient-to-br from-[#25252b] to-[#1e1e24] p-6 rounded-xl mb-8 border border-[#333] shadow-xl animate-slide-down">
            <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-2">
                <h3 className="m-0 text-lg text-white font-semibold">خدمة جديدة</h3>
                <button
                    className="bg-[#333] w-7 h-7 flex items-center justify-center rounded-full text-[#aaa] text-xl transition-all p-0 hover:bg-[#ff4444] hover:text-white border-none cursor-pointer"
                    onClick={() => setIsExpanded(false)}
                >
                    ×
                </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm text-text-muted mb-2 font-medium">الاسم</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="اسم الخدمة"
                        maxLength={20}
                        className="w-full p-3 bg-[#15151a] border border-[#333] text-white rounded-lg text-sm transition-colors focus:border-primary focus:bg-[#1a1a20] outline-none focus:ring-2 focus:ring-[rgba(100,108,255,0.2)]"
                    />
                </div>

                <div>
                    <label className="block text-sm text-text-muted mb-2 font-medium">صورة الخدمة</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            readOnly
                            placeholder="مسار الصورة"
                            value={imagePath || (icon && !icon.startsWith('data:') ? icon : '')}
                            onChange={(e) => {
                                // Allow manual edit only for emoji fallback if path is empty
                                if (!imagePath) setIcon(e.target.value);
                            }}
                            className="flex-1 p-3 bg-[#15151a] border border-[#333] text-text-muted rounded-lg text-sm overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleSelectImage}
                            className="bg-[#333] text-white border border-[#444] px-5 py-0 rounded-lg cursor-pointer transition-all hover:bg-[#444] hover:border-primary whitespace-nowrap"
                            disabled={isLoadingImage}
                        >
                            {isLoadingImage ? '...' : 'تصفح'}
                        </button>
                    </div>

                    {/* Preview / Emoji Fallback Helper */}
                    {/* Preview */}
                    {icon && (
                        <div className="flex items-center gap-4 bg-[#1a1a20] p-3 rounded-lg border border-dashed border-[#333]">
                            <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-[#111] border border-[#333] flex items-center justify-center shrink-0">
                                {icon.startsWith('data:') ? (
                                    <img src={icon} alt="Preview" className="w-full h-full object-contain p-1" />
                                ) : (
                                    <span className="text-2xl">{icon}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-text-muted mb-2 font-medium">لون الخلفية</label>
                    <div className="flex items-center gap-4 bg-[#15151a] p-2 rounded-lg border border-[#333]">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 rounded border-none bg-transparent cursor-pointer p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded"
                        />
                        <span style={{ color: color }}>{color}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full p-4 bg-gradient-to-r from-primary to-[#535bf2] rounded-lg font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-white border-none cursor-pointer"
                    disabled={!title || !icon}
                >
                    إضافة
                </button>
            </form>
        </div>
    );
}
