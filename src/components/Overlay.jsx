import React from 'react';

const Overlay = () => {
  return (
    <div className="absolute inset-0 z-[400] pointer-events-none p-4 md:p-8 flex flex-col justify-between font-sans">
      
      {/* --- TOP SECTION: TITLE --- */}
      <div className="w-full flex flex-col items-center text-center space-y-2">
        {/* Main Title */}
        <div className="relative inline-block mt-4">
          <h1 className="text-2xl md:text-5xl font-black text-yellow-400 tracking-tighter uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
            PETA PERSEBARAN
          </h1>
          <div className="h-1 w-full bg-yellow-400 mt-1 shadow-[0_2px_10px_rgba(250,204,21,0.5)]"></div>
        </div>
        
        <h2 className="text-sm md:text-lg font-bold text-white tracking-[0.3em] uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)] pt-1">
          Desa Srimulyo, Sragen
        </h2>
      </div>

      {/* --- MIDDLE SECTION: INFORMATION BOXES --- */}
      <div className="hidden md:grid flex-1 grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
        
        {/* Left Column */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="bg-black/70 backdrop-blur-md p-4 border-l-[6px] border-yellow-400 pointer-events-auto max-w-sm shadow-2xl transform transition hover:scale-[1.02]">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1 inline-block mb-3 tracking-tighter">INTRO.</span>
            <p className="text-[11px] md:text-xs leading-relaxed text-white font-medium">
              Desa Srimulyo merupakan salah satu daerah dengan pelaku UMKM batu bata yang cukup banyak. Jenis UMKM ini meliputi usaha produksi bata merah press dan bakar kayu yang menjadi penopang ekonomi utama warga desa.
            </p>
          </div>

          <div className="bg-black/70 backdrop-blur-md p-4 border-l-[6px] border-yellow-400 pointer-events-auto max-w-sm shadow-2xl transform transition hover:scale-[1.02]">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1 inline-block mb-3 tracking-tighter">GOAL.</span>
            <p className="text-[11px] md:text-xs leading-relaxed text-white font-medium">
              Tujuan pemetaan ini adalah mempermudah masyarakat luar mencari sumber material konstruksi berkualitas langsung dari produsen, sekaligus membantu pemerintah desa dalam pendataan potensi ekonomi lokal.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col justify-center items-end">
          <div className="bg-black/70 backdrop-blur-md p-4 border-r-[6px] border-yellow-400 pointer-events-auto max-w-sm shadow-2xl text-right transform transition hover:scale-[1.02]">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1 inline-block mb-3 tracking-tighter">DESC.</span>
            <p className="text-[11px] md:text-xs leading-relaxed text-white font-medium">
              Peta persebaran ini menampilkan lokasi-lokasi pengrajin bata aktif. Pengunjung dapat melihat titik-titik persebaran, menghubungi pemilik via WhatsApp, dan mendapatkan navigasi arah langsung ke lokasi pabrik.
            </p>
          </div>

          <div className="space-y-4 text-right pointer-events-auto">
            <div className="group">
              <span className="bg-white text-black text-[10px] font-black px-5 py-1.5 inline-block uppercase tracking-widest mb-2 shadow-lg">SUMBER</span>
              <div className="bg-black/80 backdrop-blur-md px-4 py-2 text-white text-[11px] font-bold border border-white/20 shadow-xl uppercase tracking-tighter">
                PETA RBI & DATA UMKM DESA
              </div>
            </div>
            
            <div className="group">
              <span className="bg-white text-black text-[10px] font-black px-5 py-1.5 inline-block uppercase tracking-widest mb-2 shadow-lg">DATA</span>
              <div className="bg-black/80 backdrop-blur-md px-4 py-2 text-white text-[11px] font-bold border border-white/20 shadow-xl uppercase tracking-tighter">
                PRODUSEN BATA SRIMULYO
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE ONLY: COMPACT INFO --- */}
      <div className="md:hidden absolute bottom-20 left-4 right-4 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border-l-4 border-yellow-400 pointer-events-auto">
          <p className="text-[10px] text-white leading-tight">
            <span className="font-bold text-yellow-400">INFO:</span> Peta lokasi pengrajin bata Desa Srimulyo. Klik marker untuk detail.
          </p>
        </div>
      </div>

      {/* --- BOTTOM SECTION: FOOTER --- */}
      <div className="w-full flex justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
          <p className="text-[9px] md:text-[10px] text-white/70 font-bold tracking-[0.2em] uppercase">
            PEMETAAN DIGITAL UMKM BATA MERAH | DESA SRIMULYO SRAGEN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
