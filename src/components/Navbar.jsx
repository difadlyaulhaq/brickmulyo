import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Home, Package, Map as MapIcon, Info } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', id: 'home', icon: Home },
    { name: 'Produk', id: 'products', icon: Package },
    { name: 'Peta Lokasi', id: 'map', icon: MapIcon },
  ];

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer group" 
              onClick={() => scrollToSection('home')}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg border border-white/10">
                <span className="text-white font-black text-lg md:text-xl">B</span>
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-slate-800'}`}>
                  Brick<span className="text-red-600">Mulyo</span>
                </h1>
                <p className={`text-[9px] md:text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-400' : 'text-slate-600'}`}>
                  Pabrik Bata Sragen
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isScrolled 
                      ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <link.icon size={16} />
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <a 
                href="https://wa.me/62812345678?text=Halo%20Brick%20Mulyo,%20saya%20tertarik%20dengan%20produk%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Phone size={18} />
                  Hubungi Kami
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 md:hidden flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors flex items-center gap-3"
          >
            <link.icon size={28} />
            {link.name}
          </button>
        ))}
        <a 
          href="https://wa.me/62812345678?text=Halo%20Brick%20Mulyo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-xl flex items-center gap-3"
        >
          <Phone size={24} />
          Hubungi Kami
        </a>
      </div>
    </>
  );
};

export default Navbar;
