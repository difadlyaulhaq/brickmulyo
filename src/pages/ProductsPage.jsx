import React, { useState, useMemo, useEffect } from 'react';
import { Check } from 'lucide-react';
import umkmData from '../data/umkm.json';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // extract digits
  const num = priceStr.replace(/[^0-9]/g, '');
  return parseInt(num || '0', 10);
}

function formatWhatsAppLink(cp) {
  if (!cp) return '#';
  const digits = (cp || '').toString().replace(/[^0-9]/g, '');
  if (!digits) return '#';

  const PREFILL = `Permisi, saya mendapat kontak Bapak/Ibu melalui website BrickMulyo. Saya ingin membahas mengenai pemesanan batu bata dengan Anda. Apakah stok untuk saat ini tersedia?`;

  const build = (num) => {
    const base = `https://wa.me/${num}`;
    const encoded = encodeURIComponent(PREFILL);
    return `${base}?text=${encoded}`;
  };

  // common Indonesian numbers: start with 0 or 8, convert to 62
  if (digits.startsWith('0')) return build(`62${digits.slice(1)}`);
  if (digits.startsWith('8')) return build(`62${digits}`);
  // already has country code like 62...
  return build(digits);
}

  const ProductsPage = ({ onBack }) => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 9;
  const [products, setProducts] = useState([]);

  // reset page when filter changes
  useEffect(() => setPage(1), [filter]);

  // load bundled data only
  useEffect(() => {
    setProducts(umkmData);
  }, []);

  useEffect(() => {
    // Ensure we are at the top when the products page is opened
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const productsFiltered = useMemo(() => {
    const copy = [...products];
    if (filter === 'low') {
      return copy.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (filter === 'high') {
      return copy.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return copy;
  }, [filter, products]);

  const totalItems = productsFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  // ensure current page is within bounds if products length changed
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedProducts = productsFiltered.slice((page - 1) * perPage, page * perPage);

  // dev-only import/export and editing removed

  // build page items for pagination display (with ellipsis)
  const pageItems = React.useMemo(() => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (page <= 4) {
      pages.push(1, 2, 3, 4, '...', totalPages);
      return pages;
    }

    if (page >= totalPages - 3) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    // middle
    pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    return pages;
  }, [page, totalPages]);

  return (
    <>
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

      <div className="min-h-screen bg-slate-50 pt-20 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 gap-4">
            <h1 className="text-4xl font-bold text-slate-900">Daftar Produk</h1>
            <div className="ml-auto" />
          </div>

          <div className="filter-card w-full mx-auto mb-6 bg-white bg-opacity-95 backdrop-blur-sm">
            <div className="filter-row flex items-center justify-between gap-4">
              <div className="text-sm font-semibold">Filter</div>
              <div className="w-full sm:w-auto">
                <label className="sr-only">Filter Produk</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="custom-select"
                >
                  <option value="all">Semua Produk</option>
                  <option value="low">Harga Terendah</option>
                  <option value="high">Harga Tertinggi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {paginatedProducts.map((p, i) => {
            const name = p.name || p.nama || 'Produk';
            const imgSrc = p.image || p.foto || '/Batu-bata-background.png';
            const priceText = (typeof p.price === 'number') ? `Rp ${p.price.toLocaleString()}/biji` : (p.price || p.priceText || p.price_string || '');
            const descText = p.desc || p.description || p.keunggulan || '';
            const cpNum = p.cp || p.wa || p.WA || '';

            return (
            <article key={i} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-slate-100 group relative flex flex-col h-full">
                <div className="h-40 w-full relative overflow-hidden">
                <img src={imgSrc} alt={name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Produk</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{name}</h3>
                <p className="text-red-600 font-bold text-xl mb-2">{priceText}</p>
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">{descText}</p>
                <div className="mt-auto flex items-center gap-3">
                  <a
                    href={cpNum ? formatWhatsAppLink(cpNum) : '#'}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`flex-1 inline-flex items-center justify-center gap-3 ${cpNum ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-slate-100 text-slate-500 cursor-not-allowed'} py-2 rounded-full font-semibold`}
                    aria-label={cpNum ? `Hubungi ${name} via WhatsApp` : 'Nomor belum tersedia'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.03.01C5.49.01.31 5.2.31 11.75c0 2.07.55 4.03 1.6 5.78L.01 24l6.62-1.72a11.67 11.67 0 0 0 5.4 1.29h.01c6.55 0 11.75-5.19 11.75-11.75 0-3.14-1.23-6.07-3.27-8.04zM12.03 21.5c-1.77 0-3.5-.48-5.01-1.39l-.36-.22-3.93 1.02 1.06-3.83-.23-.38A8.02 8.02 0 0 1 3 11.75c0-4.41 3.59-8 8.03-8 2.14 0 4.15.83 5.66 2.34 1.5 1.5 2.34 3.52 2.34 5.66 0 4.41-3.59 8-8.03 8z" />
                      <path d="M17.53 14.43c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.16.19-.33.22-.62.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.16.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.77.36-.27.29-1.02.99-1.02 2.41 0 1.42 1.05 2.8 1.2 2.99.15.19 2.07 3.2 5.02 4.49 2.95 1.3 2.95.87 3.49.82.54-.06 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z" fill="#fff"/>
                    </svg>
                    <span>Hubungi via WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          )})}
        </div>

        {/* Modal removed to avoid runtime errors when state/handlers are not present */}
          
          {/* Pagination card */}
          <div className="w-full mt-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <div className="text-sm text-slate-700">
                Menampilkan <span className="font-bold">{paginatedProducts.length}</span> produk dari <span className="font-bold">{totalItems}</span> produk
              </div>

              <div className="flex items-center gap-3">
                <button
                  aria-label="Sebelumnya"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className={`px-3 py-2 rounded-md border ${page <= 1 ? 'text-slate-400 border-slate-200 bg-slate-50' : 'text-slate-700 border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  &lt;
                </button>

                <nav className="flex items-center gap-2" aria-label="Pagination">
                  {pageItems.map((pItem, idx) => (
                    pItem === '...' ? (
                      <span key={"dot-"+idx} className="text-slate-500 px-2">&hellip;</span>
                    ) : (
                      <button
                        key={pItem}
                        onClick={() => setPage(pItem)}
                        aria-current={pItem === page ? 'page' : undefined}
                        className={`px-3 py-1 rounded-md border ${pItem === page ? 'bg-red-600 text-white border-red-600' : 'text-slate-700 border-slate-200 bg-white hover:bg-slate-50'}`}
                      >
                        {pItem}
                      </button>
                    )
                  ))}
                </nav>

                <button
                  aria-label="Selanjutnya"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className={`px-3 py-2 rounded-md border ${page >= totalPages ? 'text-slate-400 border-slate-200 bg-slate-50' : 'text-slate-700 border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .filter-card {
          background: #ffffff;
          border: 1px solid rgba(226,232,240,1);
          padding: 0.75rem;
          border-radius: 0.75rem;
          box-shadow: 0 6px 18px rgba(15,23,42,0.06);
        }

        .filter-row { display: flex; align-items: center; }

        .custom-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e6e8eb;
          background: white url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>") no-repeat right 12px center;
          background-size: 14px;
          font-size: 0.95rem;
        }

        @media (min-width: 640px) {
          .custom-select { width: 200px; }
        }
      `}</style>

      <style jsx global>{`
        @keyframes bg-scroll-horizontal {
          from { background-position: 0 0; }
          to { background-position: 600px 0; }
        }

        .animate-bg-scroll-horizontal {
          animation: bg-scroll-horizontal 40s linear infinite;
        }
      `}</style>
    </>
  );
};

export default ProductsPage;
