import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpenCheck,
  CalendarDays,
  ClipboardCheck,
  Factory,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import './styles.css';

const programs = [
  {
    name: 'Teknik Jaringan Komputer dan Telekomunikasi',
    code: 'TJKT',
    phase: 'Fase F',
    hours: 48,
    status: 'Siap validasi',
    partner: 'PT Fiber Nusantara',
    modules: 26,
    completion: 82,
  },
  {
    name: 'Akuntansi dan Keuangan Lembaga',
    code: 'AKL',
    phase: 'Fase E-F',
    hours: 44,
    status: 'Revisi ATP',
    partner: 'Koperasi Sejahtera',
    modules: 21,
    completion: 68,
  },
  {
    name: 'Desain Komunikasi Visual',
    code: 'DKV',
    phase: 'Fase E',
    hours: 42,
    status: 'Tervalidasi',
    partner: 'Studio Rana Creative',
    modules: 24,
    completion: 94,
  },
];

const agenda = [
  { date: '22 Jul', title: 'Review Capaian Pembelajaran', owner: 'Waka Kurikulum', tag: 'Kurikulum' },
  { date: '29 Jul', title: 'Sinkronisasi Industri TJKT', owner: 'Kaprodi TJKT', tag: 'IDUKA' },
  { date: '05 Agu', title: 'Supervisi Modul Ajar', owner: 'Tim Penjamin Mutu', tag: 'Dokumen' },
];

const documents = [
  'Kurikulum Operasional Satuan Pendidikan',
  'Alur Tujuan Pembelajaran',
  'Modul Ajar Produktif',
  'Pemetaan Projek Penguatan Profil Pelajar Pancasila',
];

function App() {
  const [query, setQuery] = useState('');

  const filteredPrograms = useMemo(
    () => programs.filter((program) => `${program.name} ${program.code}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">SMK</div>
          <div>
            <strong>SimKur Manuja</strong>
            <span>Manajemen Kurikulum</span>
          </div>
        </div>
        <nav className="nav-list" aria-label="Menu utama">
          <a className="active" href="#dashboard"><LayoutDashboard size={18} /> Dasbor</a>
          <a href="#program"><GraduationCap size={18} /> Program Keahlian</a>
          <a href="#dokumen"><FileText size={18} /> Dokumen</a>
          <a href="#jadwal"><CalendarDays size={18} /> Kalender Akademik</a>
          <a href="#mitra"><Factory size={18} /> Mitra Industri</a>
        </nav>
      </aside>

      <section className="content">
        <header className="hero" id="dashboard">
          <div>
            <p className="eyebrow">Aplikasi Pengelolaan Kurikulum SMK</p>
            <h1>Kelola KOSP, ATP, modul ajar, dan sinkronisasi industri dalam satu ruang kerja.</h1>
            <p className="hero-copy">
              Dirancang untuk satuan pendidikan Sekolah Menengah Kejuruan agar tim kurikulum,
              kaprodi, guru produktif, dan mitra industri dapat memantau kesiapan dokumen serta pelaksanaan pembelajaran.
            </p>
            <div className="hero-actions">
              <button><Plus size={18} /> Tambah Dokumen</button>
              <button className="secondary"><ClipboardCheck size={18} /> Lihat Validasi</button>
            </div>
          </div>
          <div className="hero-card">
            <BookOpenCheck size={36} />
            <strong>81%</strong>
            <span>Rata-rata kelengkapan kurikulum tahun ajaran berjalan</span>
          </div>
        </header>

        <section className="stats-grid" aria-label="Ringkasan">
          <article><Users /><strong>72</strong><span>Guru & asesor terlibat</span></article>
          <article><FileText /><strong>138</strong><span>Dokumen kurikulum</span></article>
          <article><Factory /><strong>16</strong><span>Mitra IDUKA aktif</span></article>
          <article><ClipboardCheck /><strong>91%</strong><span>Agenda validasi selesai</span></article>
        </section>

        <section className="panel" id="program">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Program Keahlian</p>
              <h2>Pemetaan struktur kurikulum</h2>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari program keahlian" />
            </label>
          </div>
          <div className="program-grid">
            {filteredPrograms.map((program) => (
              <article className="program-card" key={program.code}>
                <div className="program-topline">
                  <span>{program.code}</span>
                  <small>{program.status}</small>
                </div>
                <h3>{program.name}</h3>
                <p>{program.phase} · {program.hours} JP/minggu · {program.modules} modul</p>
                <div className="progress" aria-label={`Kelengkapan ${program.completion}%`}>
                  <span style={{ width: `${program.completion}%` }} />
                </div>
                <footer>Mitra sinkronisasi: <strong>{program.partner}</strong></footer>
              </article>
            ))}
          </div>
        </section>

        <div className="two-column">
          <section className="panel" id="jadwal">
            <p className="eyebrow">Agenda</p>
            <h2>Kalender kurikulum</h2>
            <div className="agenda-list">
              {agenda.map((item) => (
                <article key={item.title}>
                  <time>{item.date}</time>
                  <div><strong>{item.title}</strong><span>{item.owner} · {item.tag}</span></div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="dokumen">
            <p className="eyebrow">Repositori</p>
            <h2>Dokumen prioritas</h2>
            <ul className="document-list">
              {documents.map((document) => <li key={document}><FileText size={18} /> {document}</li>)}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
