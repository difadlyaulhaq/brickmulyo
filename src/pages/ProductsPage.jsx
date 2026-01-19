import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  // common Indonesian numbers: start with 0 or 8, convert to 62
  if (digits.startsWith('0')) return `https://wa.me/62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `https://wa.me/62${digits}`;
  // already has country code like 62...
  return `https://wa.me/${digits}`;
}

  const ProductsPage = ({ onBack, mode }) => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 9;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', cp: '', price: '', desc: '', gmaps: '', image: '' });
  const [formErrors, setFormErrors] = useState({});
  const [storedCount, setStoredCount] = useState(0);
  const [isEditing, setIsEditing] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const emptyForm = { name: '', cp: '', price: '', desc: 'Bobot ringan, pengerjaan cepat, dan insulasi panas yang baik.', gmaps: '', image: '' };

  // reset form when opening modal for a NEW product (not when editing)
  useEffect(() => {
    if (isModalOpen && isEditing === null) {
      setForm(emptyForm);
      setFormErrors({});
      setDragActive(false);
    }
  }, [isModalOpen, isEditing]);

  // reset page when filter changes
  useEffect(() => setPage(1), [filter]);

  // load products from localStorage + bundled data
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('products') || '[]');
      // stored items first, then bundled defaults
      setProducts([...(stored || []), ...umkmData]);
      setStoredCount((stored || []).length);
    } catch (e) {
      setProducts([...umkmData]);
    }
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

  // form helpers
  const handleFormChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama harus diisi';
    if (!form.cp.trim() || !/^\+?[0-9\s-]{6,15}$/.test(form.cp.trim())) e.cp = 'Nomor yang bisa dihubungi harus berupa nomor yang valid';
    if (!form.price.toString().trim() || isNaN(Number(form.price))) e.price = 'Harga harus angka';
    // Keunggulan (desc) is optional per request
    if (!form.gmaps.trim()) e.gmaps = 'Link GMaps harus diisi';
    if (!form.image) e.image = 'Foto produk harus diunggah';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveProduct = () => {
    const coordsMatch = (form.gmaps || '').match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
    const lat = coordsMatch ? parseFloat(coordsMatch[1]) : null;
    const lon = coordsMatch ? parseFloat(coordsMatch[2]) : null;

    if (isEditing !== null) {
      // Edit existing product at index isEditing
      const updated = { ...products[isEditing],
        name: form.name.trim(),
        cp: form.cp.trim(),
        price: Number(form.price),
        desc: form.desc.trim(),
        gmapsLink: form.gmaps.trim(),
        lat,
        lon,
        image: form.image || products[isEditing].image,
      };

      const nextProducts = [...products];
      nextProducts[isEditing] = updated;
      setProducts(nextProducts);

      // If edited item is from stored list, update localStorage
      if (isEditing < storedCount) {
        try {
          const stored = JSON.parse(localStorage.getItem('products') || '[]');
          stored[isEditing] = updated;
          localStorage.setItem('products', JSON.stringify(stored));
        } catch (e) {
          console.error('Failed updating stored product', e);
        }
      }

      setIsEditing(null);
      setIsModalOpen(false);
      setForm({ name: '', cp: '', price: '', desc: '', gmaps: '', image: '' });
      setFormErrors({});
      return;
    }

    const newProduct = {
      name: form.name.trim(),
      cp: form.cp.trim(),
      price: Number(form.price),
      desc: form.desc.trim(),
      gmapsLink: form.gmaps.trim(),
      lat,
      lon,
      image: form.image || '/Batu-bata-background.png',
      createdAt: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    stored.unshift(newProduct);
    localStorage.setItem('products', JSON.stringify(stored));
    setProducts((prev) => [newProduct, ...prev]);
    setStoredCount((c) => c + 1);
    setIsModalOpen(false);
    setForm({ name: '', cp: '', price: '', desc: '', gmaps: '', image: '' });
    setFormErrors({});
  };

  // Export stored products (dev mode) to a JSON file matching umkm.json format
  const exportStoredToFile = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('products') || '[]');
      const extractLatLngFromGmaps = (gmaps) => {
        if (!gmaps) return null;
        try {
          const u = decodeURIComponent(gmaps);
          let m = u.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
          if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
          m = u.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
          if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
          m = u.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
          if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
          m = u.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
          if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
          // fallback: look for any two consecutive decimals separated by comma
          m = u.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
          if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
        } catch (e) {
          // ignore
        }
        return null;
      };

      const exportItems = (stored || []).map((p, i) => {
        // prefer explicit stored lat/lon (saved as lat & lon), otherwise parse from gmaps link
        const storedLat = (typeof p.lat === 'number') ? p.lat : (p.lat ?? null);
        const storedLon = (typeof p.lon === 'number') ? p.lon : (p.lon ?? null);
        let lat = storedLat;
        let lng = storedLon;
        if ((lat === null || lat === undefined || lng === null || lng === undefined) && (p.gmapsLink || p.gmaps)) {
          const parsed = extractLatLngFromGmaps(p.gmapsLink || p.gmaps);
          if (parsed) {
            lat = parsed.lat;
            lng = parsed.lng;
          }
        }

        return {
          id: `export-${Date.now()}-${i}`,
          nama: p.name || p.nama || 'Produk',
          lat: (typeof lat === 'number' && !Number.isNaN(lat)) ? lat : null,
          lng: (typeof lng === 'number' && !Number.isNaN(lng)) ? lng : null,
          wa: (p.cp || '').toString(),
          foto: p.image || p.foto || '/Batu-bata-background.png',
          price: typeof p.price === 'number' ? `Rp ${p.price.toLocaleString()}/biji` : (p.price || ''),
          desc: p.desc || '',
        };
      });

      const blob = new Blob([JSON.stringify(exportItems, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'umkm-export.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed', e);
      alert('Gagal mengekspor data. Periksa konsol.');
    }
  };

  // Import exported JSON file into localStorage (dev-only)
  const fileInputRef = useRef(null);
  const handleImportFile = (e) => {
    const f = e.target?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error('Invalid format');

        const normalized = data.map((d) => {
          const name = d.name || d.nama || d.Nama || 'Produk';
          const cp = d.cp || d.wa || d.WA || '';
          const price = d.price || d.priceText || d.harga || '';
          const desc = d.desc || d.description || d.keunggulan || '';
          const lat = (typeof d.lat === 'number') ? d.lat : (d.lat || d.latitude || null);
          const lon = (typeof d.lng === 'number') ? d.lng : (d.lng || d.longitude || d.lon || null);
          const image = d.foto || d.image || '/Batu-bata-background.png';
          const gmapsLink = d.gmapsLink || d.gmaps || '';
          return { name, cp, price, desc, gmapsLink, lat, lon, image, createdAt: new Date().toISOString() };
        });

        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        const next = [...normalized, ...stored];
        localStorage.setItem('products', JSON.stringify(next));
        setProducts((prev) => [...normalized, ...prev]);
        setStoredCount((c) => c + normalized.length);
        alert(`Import berhasil: ${normalized.length} item disimpan ke localStorage.`);
      } catch (err) {
        console.error('Import failed', err);
        alert('Gagal mengimpor file. Pastikan format JSON benar.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(f);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) saveProduct();
  };

  const handleEdit = (index) => {
    const p = products[index];
    setForm({ name: p.name || '', cp: p.cp || '', price: (p.price ?? '') .toString(), desc: p.desc || '', gmaps: p.gmapsLink || '', image: p.image || '' });
    setIsEditing(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (!confirm('Hapus produk ini?')) return;
    const next = products.filter((_, i) => i !== index);
    setProducts(next);

    // if deleted item was in stored list, remove from localStorage
    if (index < storedCount) {
      try {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        stored.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(stored));
        setStoredCount((c) => Math.max(0, c - 1));
      } catch (e) {
        console.error('Failed removing stored product', e);
      }
    }
  };

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
            <div className="ml-auto">
              {mode === 'dev' && (
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition">Tambah Produk</button>
                  <button onClick={exportStoredToFile} className="bg-slate-100 text-slate-700 px-3 py-2 rounded-full border">Export</button>
                  <button onClick={() => fileInputRef.current?.click()} className="bg-slate-100 text-slate-700 px-3 py-2 rounded-full border">Import</button>
                  <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
                </div>
              )}
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((p, i) => {
            const name = p.name || p.nama || 'Produk';
            const imgSrc = p.image || p.foto || '/Batu-bata-background.png';
            const priceText = (typeof p.price === 'number') ? `Rp ${p.price.toLocaleString()}/biji` : (p.price || p.priceText || p.price_string || '');
            const descText = p.desc || p.description || p.keunggulan || '';
            const cpNum = p.cp || p.wa || p.WA || '';

            return (
            <article key={i} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-slate-100 group relative">
              <div className="h-40 w-full relative overflow-hidden">
                <img src={imgSrc} alt={name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                {mode === 'dev' && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => handleEdit(i)} className="bg-white/90 text-slate-800 px-2 py-1 rounded-md border shadow-sm text-xs">Edit</button>
                    <button onClick={() => handleDelete(i)} className="bg-red-600 text-white px-2 py-1 rounded-md shadow-sm text-xs">Hapus</button>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Produk</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{name}</h3>
                <p className="text-red-600 font-bold text-xl mb-2">{priceText}</p>
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">{descText}</p>
                <div className="flex items-center gap-3">
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

        {/* Modal: Tambah Produk */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 md:p-8 z-10">
              <h3 className="text-xl font-bold mb-3">Tambah Produk</h3>
              <form onSubmit={handleSubmitForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Nama <span className="text-red-600">*</span></label>
                      <input value={form.name} onChange={(e) => handleFormChange('name', e.target.value)} className={`w-full border rounded-lg px-3 py-2 ${formErrors.name ? 'border-red-300' : 'border-slate-200'}`} />
                      {formErrors.name && <div className="text-sm text-red-600 mt-1">{formErrors.name}</div>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor yang bisa dihubungi <span className="text-red-600">*</span></label>
                      <input value={form.cp} onChange={(e) => handleFormChange('cp', e.target.value)} inputMode="tel" placeholder="0812xxxxxxx" className={`w-full border rounded-lg px-3 py-2 ${formErrors.cp ? 'border-red-300' : 'border-slate-200'}`} />
                      {formErrors.cp && <div className="text-sm text-red-600 mt-1">{formErrors.cp}</div>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Harga <span className="text-red-600">*</span></label>
                      <input value={form.price} onChange={(e) => handleFormChange('price', e.target.value)} inputMode="numeric" className={`w-full border rounded-lg px-3 py-2 ${formErrors.price ? 'border-red-300' : 'border-slate-200'}`} />
                      {formErrors.price && <div className="text-sm text-red-600 mt-1">{formErrors.price}</div>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Link GMaps <span className="text-red-600">*</span></label>
                      <input value={form.gmaps} onChange={(e) => handleFormChange('gmaps', e.target.value)} className={`w-full border rounded-lg px-3 py-2 ${formErrors.gmaps ? 'border-red-300' : 'border-slate-200'}`} />
                      {formErrors.gmaps && <div className="text-sm text-red-600 mt-1">{formErrors.gmaps}</div>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Keunggulan</label>
                      <input value={form.desc} onChange={(e) => handleFormChange('desc', e.target.value)} className={`w-full border rounded-lg px-3 py-2 ${formErrors.desc ? 'border-red-300' : 'border-slate-200'}`} />
                      {formErrors.desc && <div className="text-sm text-red-600 mt-1">{formErrors.desc}</div>}
                      <p className="text-xs text-slate-500 mt-1">(Opsional)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Foto (gambar produk) <span className="text-red-600">*</span></label>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      const f = e.dataTransfer?.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = () => handleFormChange('image', reader.result);
                      reader.readAsDataURL(f);
                    }}
                    className={`w-full border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center ${dragActive ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white'}`}
                  >
                    <svg width="96" height="64" viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                      <path d="M22 40c-7 0-12-6-12-13 0-7 5-13 12-13 1 0 2 0 3 .3C28 14 33 10 40 10c7 0 12 4 14 7 2-1 5-2 8-2 7 0 12 4 12 10 0 6-5 10-12 10H22z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M48 30v10" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M40 38h16" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <div className="mt-4 flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-md cursor-pointer">
                        <span className="text-sm font-semibold text-slate-700">Browse</span>
                        <input type="file" accept="image/*" onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return handleFormChange('image', '');
                          const reader = new FileReader();
                          reader.onload = () => handleFormChange('image', reader.result);
                          reader.readAsDataURL(f);
                        }} className="hidden" />
                      </label>
                    </div>

                    <div className="text-xs text-slate-500 mt-3">or drag a file here</div>
                  </div>

                  {form.image && <img src={form.image} alt="preview" className="mt-3 w-36 h-28 object-cover rounded-md border" />}
                  {formErrors.image && <div className="text-sm text-red-600 mt-1">{formErrors.image}</div>}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => { setIsModalOpen(false); setIsEditing(null); }} className="bg-white border border-slate-200 px-4 py-2 rounded-lg">Batal</button>
                  <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
          
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
