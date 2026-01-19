import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Package, Truck, Shield, Star, Award, ChevronRight, Check, Home } from 'lucide-react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import About from './components/About';
import OrderFlow from './components/OrderFlow';
import OrderPage from './components/OrderPage';
import ProductsPage from './pages/ProductsPage';
import Footer from './components/Footer';

export default function BrickMulyoLanding() {
  const [showFloating, setShowFloating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('landing');
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('mode') || 'user'; } catch { return 'user'; }
  });
  
  useEffect(() => {
    const handleScroll = () => {
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

  if (view === 'aboutPage') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
        <Navbar setView={setView} mode={mode} setMode={setMode} />
        <main className="pt-28">
          <About setView={setView} />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === 'productsPage') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
        <Navbar setView={setView} mode={mode} setMode={setMode} />
        <main className="pt-28">
          <ProductsPage mode={mode} />
        </main>
        <Footer />
      </div>
    );
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
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex flex-col gap-3">
          <button 
            onClick={() => setView('productsPage')}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-red-500/50 transition transform hover:scale-110 flex items-center justify-center"
          >
            <Package size={20} className="md:w-6 md:h-6" />
            <span className="absolute right-14 md:right-16 bg-slate-800 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Lihat Produk
            </span>
          </button>
          
          <button 
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-orange-500/50 transition transform hover:scale-110 flex items-center justify-center"
          >
            <MapPin size={20} className="md:w-6 md:h-6" />
            <span className="absolute right-14 md:right-16 bg-slate-800 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Cek Area
            </span>
          </button>
          
          <a 
            href="https://wa.me/62812345678?text=Halo%20BrickMulyo,%20saya%20mau%20pesan%20bata"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-red-500/50 transition transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <Phone size={20} className="md:w-6 md:h-6" />
            <span className="absolute right-14 md:right-16 bg-slate-800 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Chat WA
            </span>
          </a>
        </div>
      )}
      <Navbar setView={setView} mode={mode} setMode={setMode} />

      {/* Hero Section (updated to match attachments) */}
      <section id="home" className="relative pt-24 md:pt-28 lg:pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Home className="w-4 h-4" />
            <span>Batu Bata Srimulyo</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-4">
            Portal UMKM Batu Bata Desa Srimulyo
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Situs khusus untuk pelaku UMKM batu bata di Desa Srimulyo — katalog produk, lokasi pengrajin, dan kontak langsung.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={() => setView('productsPage')} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Jelajah Produk
            </button>
            <button onClick={() => setView('aboutPage')} className="bg-white text-red-700 px-6 py-3 rounded-full font-semibold border border-red-100 hover:bg-red-50 transition">
              Tentang Kami
            </button>
          </div>
        </div>
      </section>

      {/* Potensi Lokal removed per request (gallery and images eliminated) */}

      {/* Why Choose Us Section removed */}

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
                        <Check className="w-4 h-4 text-red-600" />
                      <span>Kualitas terjamin</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-red-600" />
                      <span>Stok selalu tersedia</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setView('productsPage')}
                    className="w-full py-3 rounded-full font-bold transition transform hover:scale-105 text-center no-underline cursor-pointer bg-red-50 text-red-800 hover:bg-red-100 border border-red-200"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
            {/* Additional 'Lihat lainnya' card */}
            <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 flex items-center justify-center border-2 border-slate-100 group">
              <div className="p-8 lg:p-10 text-center">
                  <button onClick={() => setView('productsPage')} className="flex items-center gap-3 text-lg lg:text-xl font-bold text-slate-800">
                    <span>Lihat lainnya</span>
                    <span className="text-red-600">-&gt;</span>
                  </button>
                </div>
            </div>
          </div>
          
          {/* 'Butuh Penawaran untuk Proyek Besar?' card removed per request */}
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

      {/* Gallery Section removed per request */}

      {/* Map Coverage Dashboard */}
      <section id="map" className="py-16 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4">Peta Digital</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">Visualisasi sebaran lokasi pengrajin batu bata merah di wilayah Desa Srimulyo</p>
          </div>
          
          {/* Main Map Container */}
          <div className="h-[400px] sm:h-[500px] md:h-[700px] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-slate-800 relative z-0 mb-12">
             <Map />
          </div>

          {/* Coverage details removed per request */}
        </div>
      </section>

      {/* CTA Section removed per request */}

      <Footer />

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