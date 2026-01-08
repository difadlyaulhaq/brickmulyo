import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Package, Truck, Shield, Star, Award, ChevronRight, Check } from 'lucide-react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import OrderFlow from './components/OrderFlow';
import OrderPage from './components/OrderPage';

export default function BrickMulyoLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [showFloating, setShowFloating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('landing');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowFloating(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const products = [
      {
        name: 'Bata Merah Press',
        price: 'Rp 850/biji',
        desc: 'Kualitas premium, permukaan halus, presisi tinggi. Cocok untuk dinding ekspos.',
        image: '/Batu-bata-background.png'
      },
      {
        name: 'Bata Merah Biasa',
        price: 'Rp 650/biji',
        desc: 'Standar konstruksi umum, kuat dan ekonomis untuk dinding plesteran.',
        image: '/Batu-bata-background.png'
      },
      {
        name: 'Bata Ringan',
        price: 'Rp 9.500/biji',
        desc: 'Bobot ringan, pengerjaan cepat, dan insulasi panas yang baik.',
        image: '/Batu-bata-background.png'
      },
      {
        name: 'Bata Expose',
        price: 'Rp 1.200/biji',
        desc: 'Estetik tampak natural dengan tekstur unik untuk desain industrial.',
        image: '/Batu-bata-background.png'
      },
    ];
  const features = [
    { icon: Shield, title: 'Kualitas Terjamin', desc: 'Bata dari tanah liat pilihan' },
    { icon: Truck, title: 'Antar Gratis', desc: 'Area Sragen & sekitar' },
    { icon: Package, title: 'Stok Selalu Ada', desc: 'Produksi rutin setiap hari' },
    { icon: Star, title: 'Harga Bersaing', desc: 'Langsung dari pabrik' },
  ];

  if (view === 'order' && selectedProduct) {
    return <OrderPage product={selectedProduct} onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Animated Brick Background Pattern */}
      <div className="fixed inset-0 opacity-[0.2] pointer-events-none">
        <div 
          className="absolute inset-0 animate-bg-scroll-horizontal"
          style={{
            backgroundImage: `url('/Batu-bata-background.png')`,
            backgroundSize: '600px auto',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Floating Action Buttons */}
      {showFloating && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-red-500/50 transition transform hover:scale-110 flex items-center justify-center"
          >
            <Package size={24} />
            <span className="absolute right-16 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Lihat Produk
            </span>
          </button>
          
          <button 
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-orange-500/50 transition transform hover:scale-110 flex items-center justify-center"
          >
            <MapPin size={24} />
            <span className="absolute right-16 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Cek Area
            </span>
          </button>
          
          <a 
            href="https://wa.me/62812345678?text=Halo%20BrickMulyo,%20saya%20mau%20pesan%20bata"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-green-500/50 transition transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <Phone size={24} />
            <span className="absolute right-16 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Chat WA
            </span>
          </a>
        </div>
      )}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-slide-right"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23C04A35" fill-opacity="0.2"%3E%3Crect width="50" height="20" x="0" y="0"/%3E%3Crect width="50" height="20" x="50" y="20"/%3E%3Crect width="50" height="20" x="0" y="40"/%3E%3Crect width="50" height="20" x="50" y="60"/%3E%3Crect width="50" height="20" x="0" y="80"/%3E%3C/g%3E%3C/svg%3E')`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
              
              {/* Badge Section */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                <div className="inline-flex items-center gap-2 bg-red-100 border border-red-300 text-red-900 px-4 py-2 rounded-full text-sm font-bold animate-slide-down">
                  <Award className="w-5 h-5" />
                  <span>Pabrik Terpercaya Sragen</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-slate-800 mb-2">Batu Bata Berkualitas</span>
                <span className="block bg-gradient-to-r from-red-600 via-red-700 to-slate-900 bg-clip-text text-transparent">Langsung dari Pabrik</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Produksi bata merah pilihan dengan standar kualitas tinggi. Siap kirim ke seluruh wilayah Sragen dan sekitarnya dengan harga terbaik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  href="https://wa.me/62812345678?text=Halo%20BrickMulyo,%20saya%20mau%20pesan%20bata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition text-base lg:text-lg flex items-center justify-center gap-2 no-underline"
                >
                  <Phone size={22} />
                  Pesan Sekarang
                </a>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-red-900 px-8 py-4 rounded-full font-semibold border-2 border-red-900 hover:bg-red-50 transition text-base lg:text-lg flex items-center justify-center gap-2"
                >
                  <Package size={22} />
                  Lihat Produk
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-red-600">15+</p>
                  <p className="text-xs lg:text-sm text-slate-600">Tahun Berpengalaman</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-red-600">1000+</p>
                  <p className="text-xs lg:text-sm text-slate-600">Proyek Selesai</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-red-600">99%</p>
                  <p className="text-xs lg:text-sm text-slate-600">Kepuasan Pelanggan</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full max-w-md lg:max-w-xl relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-600 to-slate-900 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Bata Merah Berkualitas"
                  className="relative w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-slate-500">Kualitas</p>
                        <p className="text-sm font-bold text-slate-800">Terjamin</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center gap-3">
                      <Truck className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-slate-500">Pengiriman</p>
                        <p className="text-sm font-bold text-slate-800">Gratis*</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-slate-500">Harga</p>
                        <p className="text-sm font-bold text-slate-800">Pabrik</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-red-50 to-orange-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
              Kenapa Harus BrickMulyo?
            </h2>
            <p className="text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
              Kami adalah pabrik bata terpercaya dengan pengalaman puluhan tahun melayani proyek konstruksi di Sragen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h4 className="text-lg lg:text-xl font-bold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-slate-900 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <img 
                src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&h=600&fit=crop"
                alt="Proses Produksi Bata"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-4xl font-bold text-slate-800">
                Proses Produksi Berkualitas
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Setiap bata yang kami produksi melewati kontrol kualitas ketat. Dari pemilihan tanah liat, pembakaran, hingga pengeringan dilakukan dengan standar terbaik.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Tanah Liat Pilihan</h4>
                    <p className="text-sm text-slate-600">Menggunakan tanah liat berkualitas tinggi dari sumber terpercaya</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Pembakaran Optimal</h4>
                    <p className="text-sm text-slate-600">Suhu dan waktu pembakaran dikontrol untuk hasil maksimal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Quality Control Ketat</h4>
                    <p className="text-sm text-slate-600">Setiap batch diperiksa sebelum dikirim ke pelanggan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 lg:py-24 px-4 bg-white relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23C04A35" fill-opacity="0.4"%3E%3Crect width="30" height="10" x="0" y="0"/%3E%3Crect width="30" height="10" x="30" y="10"/%3E%3C/g%3E%3C/svg%3E')`,
            backgroundSize: '150px 150px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Package className="inline w-5 h-5 mr-2" />
              Produk Kami
            </div>
            <h3 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">Pilihan Bata Berkualitas</h3>
            <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
              Berbagai jenis bata untuk memenuhi kebutuhan konstruksi Anda dengan harga terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mt-16">
            {products.map((product, idx) => (
              <div 
                key={idx} 
                className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col border-2 border-slate-100 group"
              >
                {idx === 0 && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl whitespace-nowrap z-30 animate-bounce-slow">
                    🔥 TERLARIS
                  </div>
                )}
                <div className="h-48 overflow-hidden relative rounded-t-[22px]">
                   <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                   <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 relative z-10"
                   />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg z-20">
                      <Package size={20} className="text-orange-600" />
                   </div>
                </div>
                
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <h4 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">{product.name}</h4>
                  <p className="text-3xl lg:text-4xl font-bold text-red-600 mb-3">{product.price}</p>
                  <p className="text-slate-600 text-sm mb-6 flex-1">{product.desc}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Kualitas terjamin</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Stok selalu tersedia</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setView('order');
                    }}
                    className={`w-full py-3 rounded-full font-bold transition transform hover:scale-105 text-center no-underline cursor-pointer ${
                      idx === 0
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 lg:p-12 border border-orange-200">
              <Package className="w-16 h-16 text-red-700 mx-auto mb-6" />
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                Butuh Penawaran untuk Proyek Besar?
              </h3>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Untuk pemesanan dalam jumlah besar atau proyek khusus, silakan hubungi tim kami untuk mendapatkan harga spesial
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/62812345678?text=Halo%20BrickMulyo,%20saya%20butuh%20penawaran%20untuk%20proyek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-red-700 px-8 py-4 rounded-full font-bold border-2 border-red-700 hover:bg-red-50 transition flex items-center justify-center gap-2 no-underline"
                >
                  <Phone size={20} />
                  Minta Penawaran
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">Cara Pemesanan</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Proses mudah dan cepat untuk mendapatkan bata berkualitas tinggi</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Pilih Produk', desc: 'Tentukan jenis dan jumlah bata yang Anda butuhkan sesuai proyek.' },
              { step: '02', title: 'Konsultasi WA', desc: 'Hubungi admin kami untuk cek ketersediaan stok dan jadwal kirim.' },
              { step: '03', title: 'Konfirmasi Lokasi', desc: 'Kirimkan lokasi pengiriman untuk menghitung estimasi waktu tiba.' },
              { step: '04', title: 'Bata Dikirim', desc: 'Pesanan akan diantar menggunakan truk armada kami sendiri.' },
            ].map((s, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-red-600 transition duration-500 overflow-hidden">
                <span className="text-6xl font-black text-slate-200 absolute top-4 right-4 group-hover:text-red-500/50 transition duration-500">{s.step}</span>
                <div className="relative z-10 pt-12">
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-white transition duration-500">{s.title}</h4>
                  <p className="text-sm text-slate-600 group-hover:text-red-50 transition duration-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">Galeri Aktivitas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Intip langsung proses produksi dan pengiriman kami yang menjamin kualitas terbaik sampai ke tangan Anda
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group h-96 shadow-lg">
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Construction Work" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <h4 className="text-white font-black text-2xl mb-2 uppercase tracking-tighter">Implementasi Proyek</h4>
                   <p className="text-white/80 text-sm">Bata kami dipercaya untuk berbagai proyek perumahan dan komersial berskala besar.</p>
                </div>
             </div>
             <div className="relative rounded-3xl overflow-hidden group h-44 shadow-md">
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Brick Quality" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-bold text-xs uppercase tracking-widest">Quality Control</span>
                </div>
             </div>
             <div className="relative rounded-3xl overflow-hidden group h-44 shadow-md">
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Production Line" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-bold text-xs uppercase tracking-widest">Produksi Rutin</span>
                </div>
             </div>
             <div className="relative rounded-3xl overflow-hidden group h-44 shadow-md">
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Truck Delivery" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-bold text-xs uppercase tracking-widest">Siap Kirim</span>
                </div>
             </div>
             <div className="relative rounded-3xl overflow-hidden group h-44 shadow-md">
                <img 
                  src="/Batu-bata-hero.png" 
                  alt="Clay Source" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-bold text-xs uppercase tracking-widest">Bahan Baku</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Map Coverage Dashboard */}
      <section id="map" className="py-16 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4">Peta Digital UMKM</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">Visualisasi sebaran lokasi pengrajin batu bata merah di wilayah Desa Srimulyo</p>
          </div>
          
          {/* Main Map Container */}
          <div className="h-[600px] md:h-[700px] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-slate-800 relative z-0 mb-12">
             <Map />
          </div>

          {/* Coverage Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-red-500" />
                Area Layanan Utama
              </h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  Kecamatan Gondang (Srimulyo & Sekitar)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  Kecamatan Sambungmacan
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  Kecamatan Ngrampal
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  Wilayah Kota Sragen
                </li>
              </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Truck className="text-red-500" />
                Syarat Pengiriman Gratis
              </h4>
              <div className="space-y-3 text-slate-300 text-sm">
                <p>✓ Minimal pembelian 1000 biji (1 truk)</p>
                <p>✓ Akses jalan bisa dilalui truk</p>
                <p>✓ Waktu pengiriman: Senin - Sabtu</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-red-700 p-6 rounded-2xl shadow-xl text-white">
              <h4 className="text-xl font-bold mb-4">Luar Area Sragen?</h4>
              <p className="text-sm text-red-100 mb-6">
                Kami tetap bisa melayani pengiriman ke luar area dengan biaya tambahan yang kompetitif.
              </p>
              <a 
                href="https://wa.me/62812345678?text=Halo%20Brick%20Mulyo,%20saya%20mau%20tanya%20ongkir"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-700 px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Phone size={18} />
                Tanya Ongkir
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h3>
          <p className="text-xl mb-8 text-red-100">Hubungi kami sekarang untuk konsultasi dan pemesanan</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://wa.me/62812345678?text=Halo%20Brick%20Mulyo,%20saya%20mau%20pesan%20bata"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 hover:bg-slate-100 px-10 py-4 rounded-lg font-bold text-lg transition-all inline-flex items-center gap-2"
            >
              <Phone size={24} />
              Chat WhatsApp
            </a>
            <a 
              href="tel:+62812345678"
              className="bg-slate-800 hover:bg-slate-900 px-10 py-4 rounded-lg font-bold text-lg transition-all"
            >
              Telepon Langsung
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-orange-400 mb-4">BrickMulyo</h4>
              <p className="text-sm mb-4">
                Pabrik batu bata terpercaya di Sragen. Melayani kebutuhan konstruksi Anda dengan kualitas terbaik.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Kontak</h5>
              <div className="space-y-2 text-sm">
                <p>📱 WhatsApp: 0812-3456-78</p>
                <p>📞 Telepon: (0274) 123456</p>
                <p>📍 Sragen, Jawa Tengah</p>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Jam Operasional</h5>
              <div className="space-y-2 text-sm">
                <p>Senin - Sabtu: 07.00 - 17.00 WIB</p>
                <p>Minggu: Libur</p>
                <p className="text-orange-400 mt-3">✓ Siap melayani pemesanan setiap hari</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} BrickMulyo. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bg-scroll-horizontal {
          from { background-position: 0 0; }
          to { background-position: 600px 0; }
        }

        .animate-bg-scroll-horizontal {
          animation: bg-scroll-horizontal 40s linear infinite;
        }

        @keyframes slide-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(50px); }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-right {
          animation: slide-right 30s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -5px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}