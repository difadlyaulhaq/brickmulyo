import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin, Phone, Truck, Package, CreditCard, ChevronLeft, Info, CheckCircle } from 'lucide-react';

const OrderPage = ({ product, onBack }) => {
  // Form State
  const [quantity, setQuantity] = useState(1000);
  const [deliveryType, setDeliveryType] = useState('delivery'); // delivery | pickup
  const [deliveryDate, setDeliveryDate] = useState('');
  
  // Contact State
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Pricing Logic
  const getPrice = () => {
    if (!product) return 0;
    const cleanPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    return cleanPrice;
  };

  const unitPrice = getPrice();
  const subtotal = unitPrice * quantity;
  
  // Simple Shipping Logic (Simulation)
  const getShippingCost = () => {
    if (deliveryType === 'pickup') return 0;
    if (quantity >= 1000) return 0; // Free shipping promo for > 1000
    return 150000; // Flat rate small quantity
  };

  const shippingCost = getShippingCost();
  const grandTotal = subtotal + shippingCost;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = () => {
    if (!contact.name || !contact.phone || (deliveryType === 'delivery' && !contact.address)) {
      alert('Mohon lengkapi data pemesan dan alamat pengiriman.');
      return;
    }

    let message = `*Halo BrickMulyo, Saya ingin memesan batu bata:*

`;
    message += `📋 *Detail Pesanan:*
`;
    message += `Produk: ${product.name}
`;
    message += `Jumlah: ${quantity.toLocaleString()} biji
`;
    message += `Tgl Kirim: ${deliveryDate || 'Secepatnya'}
`;
    message += `Metode: ${deliveryType === 'delivery' ? 'Diantar Toko' : 'Ambil Sendiri'}

`;

    message += `👤 *Data Pemesan:*
`;
    message += `Nama: ${contact.name}
`;
    message += `No HP: ${contact.phone}
`;
    if (deliveryType === 'delivery') {
      message += `Alamat: ${contact.address}
`;
    }
    
    message += `
💰 *Rincian Biaya:*
`;
    message += `Harga Barang: ${formatCurrency(subtotal)}
`;
    message += `Ongkir: ${shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost)}
`;
    message += `*Total Estimasi: ${formatCurrency(grandTotal)}*
`;
    
    if (contact.notes) message += `
Catatan: ${contact.notes}`;
    message += `

Mohon info ketersediaan dan pembayaran. Terima kasih.`;

    const whatsappUrl = `https://wa.me/62812345678?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32 lg:pb-20">
      {/* Header / Navbar Replacement */}
      <div className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-slate-800">Formulir Pemesanan</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Detail Produk */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="text-red-600" /> 1. Detail Produk
            </h2>
            
            <div className="flex gap-6 items-start mb-6">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                <p className="text-red-600 font-bold">{product.price}</p>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.desc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Pesanan (Biji)</label>
                <input 
                  type="number" 
                  min="100"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800 font-bold text-lg"
                />
                {quantity >= 1000 && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <CheckCircle size={12} /> Memenuhi syarat gratis ongkir area lokal
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rencana Kirim</label>
                <input 
                  type="date" 
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* 2. Metode Pengiriman */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Truck className="text-red-600" /> 2. Pengiriman
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => setDeliveryType('delivery')}
                className={`p-4 border-2 rounded-xl text-left transition flex items-center gap-3 ${ 
                  deliveryType === 'delivery' ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-slate-200 hover:border-red-300'
                }`}
              >
                <div className={`p-2 rounded-full ${deliveryType === 'delivery' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Truck size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Diantar Toko</div>
                  <div className="text-xs text-slate-500">Armada Truck/Pickup</div>
                </div>
              </button>

              <button 
                onClick={() => setDeliveryType('pickup')}
                className={`p-4 border-2 rounded-xl text-left transition flex items-center gap-3 ${ 
                  deliveryType === 'pickup' ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-slate-200 hover:border-red-300'
                }`}
              >
                <div className={`p-2 rounded-full ${deliveryType === 'pickup' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Package size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Ambil Sendiri</div>
                  <div className="text-xs text-slate-500">Gudang Sragen</div>
                </div>
              </button>
            </div>

            {deliveryType === 'delivery' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Pengiriman</label>
                  <textarea 
                    rows="3"
                    placeholder="Nama Jalan, RT/RW, Desa, Kecamatan, Patokan..."
                    value={contact.address}
                    onChange={(e) => setContact({...contact, address: e.target.value})}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
                  ></textarea>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                  <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-blue-800">
                    Pastikan akses jalan menuju lokasi dapat dilalui oleh Truk Engkel/Pickup. Jika jalan sempit mohon beri catatan.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3. Data Pemesan */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="text-red-600" /> 3. Data Kontak
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text"
                  placeholder="Contoh: Bpk. Budi"
                  value={contact.name}
                  onChange={(e) => setContact({...contact, name: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp</label>
                <input 
                  type="tel"
                  placeholder="0812..."
                  value={contact.phone}
                  onChange={(e) => setContact({...contact, phone: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan Tambahan (Opsional)</label>
              <textarea 
                rows="2"
                placeholder="Misal: Dikirim pagi hari, atau tolong bata yang kering..."
                value={contact.notes}
                onChange={(e) => setContact({...contact, notes: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
              ></textarea>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-4 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <CreditCard className="text-red-500" /> Ringkasan Biaya
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3 pb-4 border-b border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga Satuan</span>
                    <span className="font-medium text-slate-800">{formatCurrency(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jumlah</span>
                    <span className="font-medium text-slate-800">{quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Subtotal Barang</span>
                    <span className="text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                <div className="space-y-2 pb-4 border-b border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ongkos Kirim</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                      {shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-slate-400 text-right italic">
                      *Estimasi untuk jumlah kecil
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-slate-800 font-bold">Total Estimasi</span>
                    <span className="text-2xl font-black text-red-600">{formatCurrency(grandTotal)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 text-right">
                    *Harga final akan dikonfirmasi admin
                  </p>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-green-500/30 transition flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Pesan via WhatsApp
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-full h-fit">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Butuh Bantuan?</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Jika Anda ragu mengenai jumlah kebutuhan atau lokasi, silakan konsultasi gratis.
                  </p>
                  <a href="https://wa.me/62812345678" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 mt-2 block hover:underline">
                    Hubungi Admin &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 lg:hidden z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Estimasi</p>
            <p className="text-xl font-black text-red-600 leading-none">{formatCurrency(grandTotal)}</p>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 text-sm"
          >
            <Phone size={18} />
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
