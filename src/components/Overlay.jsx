import { useState } from 'react';
import umkmData from '../data/umkm.json';

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`absolute top-4 right-4 z-[400] transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-12 h-12'}`}>
      <div className={`bg-white/95 backdrop-blur-sm shadow-xl rounded-lg border-l-4 border-primary overflow-hidden ${!isOpen && 'rounded-full border-none'}`}>
        
        {/* Header / Toggle Area */}
        <div 
          className={`flex justify-between items-center p-3 bg-slate-50 border-b border-slate-100 cursor-pointer ${!isOpen && 'p-0 h-12 w-12 justify-center bg-white border-2 border-primary/20'}`} 
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Minimize" : "Show Legend"}
        >
          {isOpen && <h3 className="font-bold text-neutralDark text-sm">Informasi Peta</h3>}
           <button className="text-slate-400 hover:text-primary focus:outline-none">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="p-4">
            <h4 className="font-bold text-primary mb-1">Desa BrickMulyo</h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Pusat industri batu bata merah berkualitas. Klik marker untuk melihat detail dan menghubungi pengrajin.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C04A35" stroke="#FFFFFF" strokeWidth="2" className="w-6 h-6 drop-shadow-sm">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3" fill="white"></circle>
                   </svg>
                 </div>
                 <span className="text-xs font-medium text-neutralDark">Lokasi UMKM</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-1 bg-[#D98E56] rounded-full"></div>
                <span className="text-xs font-medium text-neutralDark">Batas Wilayah</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
               <div className="text-[10px] text-slate-400">
                 Total: {umkmData.length} UMKM
               </div>
               <div className="text-[10px] text-slate-400 italic">
                 Updated: Jan 2026
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overlay;
