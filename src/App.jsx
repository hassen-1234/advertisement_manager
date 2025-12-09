import React, { useState, useRef, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { toPng } from 'html-to-image';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';
import './App.css';
import ServiceSelector from './components/ServiceSelector';
import AdPreview from './components/AdPreview';
import { services as initialServices } from './data';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-white text-center" style={{ direction: 'rtl' }}>
          <h1>حدث خطأ غير متوقع</h1>
          <p className="text-[#ff4444]">{this.state.error && this.state.error.toString()}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-primary px-4 py-2 rounded text-white border-none cursor-pointer">
            إعادة تحميل التطبيق
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [servicesList, setServicesList] = useState(initialServices);
  const [selectedServices, setSelectedServices] = useState([]);
  const adRef = useRef(null);

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(sid => sid !== id)
        : [...prev, id]
    );
  };

  const handleAddService = (newService) => {
    const serviceWithId = {
      ...newService,
      id: Date.now()
    };
    setServicesList(prev => [serviceWithId, ...prev]);
    setSelectedServices(prev => [...prev, serviceWithId.id]);
  };

  const handleExport = useCallback(async () => {
    if (adRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(adRef.current, { cacheBust: true, pixelRatio: 2 });

      const base64Data = dataUrl.split(',')[1];
      const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

      const filePath = await save({
        filters: [{
          name: 'Image',
          extensions: ['png']
        }]
      });

      if (filePath) {
        await writeFile(filePath, binaryData);
        toast.success('تم حفظ الإعلان بنجاح!');
      }
    } catch (err) {
      console.error('Failed to export image:', err);
      toast.error('فشل في حفظ الصورة.');
    }
  }, [adRef]);

  return (
    <ErrorBoundary>
      {/* Main container: column on mobile, row on desktop. RTL direction. */}
      <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-hidden bg-bg text-text-main" style={{ direction: 'rtl' }}>
        <ServiceSelector
          services={servicesList}
          selectedIds={selectedServices}
          onToggle={toggleService}
          onAddService={handleAddService}
        />


        {/* Preview Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[60vh] md:min-h-auto overflow-hidden bg-[radial-gradient(#2d2d35_1px,transparent_1px)] bg-[length:20px_20px]">
          <AdPreview
            ref={adRef}
            selectedIds={selectedServices}
            allServices={servicesList}
          />

          <div className="flex gap-4 fixed top-4 left-4 z-50 md:absolute md:top-8 md:left-8 md:right-auto md:translate-x-0">
            <button
              onClick={handleExport}
              className="bg-primary hover:bg-[#535bf2] text-white border-none px-6 py-2 rounded-full font-bold cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm active:scale-95 flex items-center gap-2"
            >
              <span>💾</span>
              <span>تصدير</span>
            </button>
          </div>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
