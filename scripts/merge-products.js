#!/usr/bin/env node
/**
 * scripts/merge-products.js
 * Usage: node scripts/merge-products.js path/to/umkm-export.json
 * Merges exported products into src/data/umkm.json and writes the file (creates backup).
 */
import fs from 'fs';
import path from 'path';

const exportPath = process.argv[2] || path.resolve(process.cwd(), 'umkm-export.json');
const targetPath = path.resolve(process.cwd(), 'src', 'data', 'umkm.json');

function normalizeWa(cp) {
  if (!cp) return '';
  const digits = cp.toString().replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

try {
  if (!fs.existsSync(exportPath)) {
    console.error('Export file not found:', exportPath);
    process.exit(1);
  }

  const rawExport = fs.readFileSync(exportPath, 'utf8');
  const exported = JSON.parse(rawExport);

  let current = [];
  if (fs.existsSync(targetPath)) {
    current = JSON.parse(fs.readFileSync(targetPath, 'utf8')) || [];
  }

  const maxId = current.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);
  let nextId = maxId + 1;

  const newEntries = exported.map((e) => {
    const lat = typeof e.lat === 'number' ? e.lat : (e.lat || e.latitude || null);
    const lng = typeof e.lng === 'number' ? e.lng : (e.lng || e.longitude || null);
    return {
      id: nextId++,
      nama: e.nama || e.name || 'Produk',
      lat: Number(lat) || null,
      lng: Number(lng) || null,
      wa: normalizeWa(e.wa || e.cp || ''),
      foto: e.foto || e.image || '/Batu-bata-background.png',
      price: e.price || '',
      desc: e.desc || '',
    };
  }).filter(it => it.lat !== null && it.lng !== null);

  if (newEntries.length === 0) {
    console.log('No valid entries found in export. No changes made.');
    process.exit(0);
  }

  // backup
  const backupPath = `${targetPath}.bak`;
  fs.copyFileSync(targetPath, backupPath);
  console.log('Backup created:', backupPath);

  const merged = [...current, ...newEntries];
  fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`Wrote ${newEntries.length} entries to ${targetPath}`);
} catch (err) {
  console.error('Failed to merge export:', err);
  process.exit(1);
}
