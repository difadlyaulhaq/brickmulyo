import React, { useState } from 'react';
import { Package, Truck, Phone, ChevronLeft, MapPin } from 'lucide-react';

const OrderFlow = ({ product, onClose }) => {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1000);
  const [location, setLocation] = useState('');
  
  const totalPrice = quantity * parseInt(product.price.replace(/[^0-9]/g, ''));

  const handleNext = () => {
    if (step === 1 && quantity < 1) return;
    if (step === 2 && !location) return;
    
    if (step === 2) {
      // Final Step: Redirect to WhatsApp
      const message = `Halo BrickMulyo, saya ingin memesan:\n\n` +
        `📦 Produk: ${product.name}\n` +
        `🧱 Jumlah: ${quantity.toLocaleString()} biji\n` +
        `📍 Lokasi Kirim: ${location}\n` +
        `💰 Estimasi Total: Rp ${totalPrice.toLocaleString()}\n\n` +
        `Mohon info ketersediaan dan ongkos kirim. Terima kasih.`;
      
      const whatsappUrl = `https://wa.me/62812345678?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Package className="text-red-500" />
            Form Pemesanan
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h4>
            <p className="text-red-600 font-bold text-xl">{product.price}</p>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Jumlah Pesanan (Biji)</label>
              <input 
                type="number" 
                min="1000"
                step="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl text-xl font-bold text-slate-800 focus:border-red-500 outline-none"
              />
              <p className="text-xs text-slate-500">Minimal pemesanan disarankan 1000 biji (1 pick up)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Lokasi Pengiriman</label>
              <textarea 
                rows="3"
                placeholder="Contoh: Jl. Sukowati No. 12, Sragen Tengah..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl text-slate-800 focus:border-red-500 outline-none"
              ></textarea>
            </div>
          )}

          {/* Summary */}
          <div className="mt-8 bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 text-sm">Estimasi Harga</span>
            <span className="text-xl font-black text-slate-800">Rp {totalPrice.toLocaleString()}</span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                <ChevronLeft />
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2"
            >
              {step === 1 ? 'Lanjut ke Lokasi' : 'Kirim via WhatsApp'}
              {step === 2 && <Phone size={18} />}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 mt-auto">
          <div 
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderFlow;
