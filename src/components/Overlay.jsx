import React from 'react';

const Overlay = () => {
  return (
    <div className="absolute inset-0 z-[400] pointer-events-none p-4 flex flex-col justify-between">
      {/* Top Header Section */}
      <div className="w-full text-center space-y-1">
        <div className="flex justify-center gap-4 mb-2 pointer-events-auto">
          {/* Logo Placeholders */}
          <div className="bg-white/20 px-3 py-1 rounded text-[10px] text-white font-bold border border-white/30 backdrop-blur-sm">UNDIP</div>
          <div className="bg-white/20 px-3 py-1 rounded text-[10px] text-white font-bold border border-white/30 backdrop-blur-sm">KKN-T</div>
          <div className="bg-white/20 px-3 py-1 rounded text-[10px] text-white font-bold border border-white/30 backdrop-blur-sm">SRIMULYO</div>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-yellow-400 tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          PETA PERSEBARAN UMKM
        </h1>
        <h2 className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          DESA SRIMULYO, KEC. GONDANG
        </h2>
      </div>

      {/* Main Grid for Info Boxes */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="bg-black/60 backdrop-blur-sm p-3 border-l-4 border-yellow-400 pointer-events-auto max-w-xs">
            <h3 className="bg-white text-black text-[10px] font-black px-2 py-0.5 inline-block mb-2">INTRO.</h3>
            <p className="text-[10px] leading-tight text-white/90">
              Dusun Srimulyo merupakan pusat pengrajin batu bata merah di Sragen. Jenis UMKM yang ada didominasi oleh industri rumahan pembuatan batu bata berkualitas tinggi yang telah menyuplai kebutuhan konstruksi di berbagai wilayah.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm p-3 border-l-4 border-yellow-400 pointer-events-auto max-w-xs">
            <h3 className="bg-white text-black text-[10px] font-black px-2 py-0.5 inline-block mb-2">GOAL.</h3>
            <p className="text-[10px] leading-tight text-white/90">
              Mempermudah masyarakat dalam mencari sumber material batu bata berkualitas langsung dari produsen. Serta membantu pemetaan potensi ekonomi desa untuk pengembangan UMKM berkelanjutan.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end space-y-4">
          <div className="bg-black/60 backdrop-blur-sm p-3 border-r-4 border-yellow-400 pointer-events-auto max-w-xs text-right">
            <h3 className="bg-white text-black text-[10px] font-black px-2 py-0.5 inline-block mb-2">DESC.</h3>
            <p className="text-[10px] leading-tight text-white/90">
              Peta ini menampilkan titik koordinat pengrajin batu bata aktif di wilayah Srimulyo. Setiap titik menyediakan informasi pemilik, lokasi detail, dan akses langsung komunikasi via WhatsApp.
            </p>
          </div>

          <div className="space-y-2 text-right">
            <div className="bg-white text-black text-[10px] font-black px-4 py-1 inline-block uppercase tracking-wider pointer-events-auto">
              Sumber
            </div>
            <div className="bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-[10px] font-bold border border-white/20 pointer-events-auto">
              PETA RBI & DATA DESA
            </div>
            <div className="bg-white text-black text-[10px] font-black px-4 py-1 inline-block uppercase tracking-wider mt-2 pointer-events-auto">
              Data
            </div>
            <div className="bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-[10px] font-bold border border-white/20 pointer-events-auto uppercase">
              UMKM Bata Srimulyo
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-[8px] text-white/50 text-center mt-auto pt-4 pointer-events-none">
        KKN-T UNIVERSITAS DIPONEGORO 2023 | TEKNIK GEODESI | DESA SRIMULYO SRAGEN
      </div>
    </div>
  );
};

export default Overlay;