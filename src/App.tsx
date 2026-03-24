import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './App.css';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackToTop from './components/UI/BackToTop';
import type { AdminPanelProps } from './components/UI/AdminPanel';
import JsonEditorModal from './components/UI/JsonEditorModal';

import Hero from './sections/Hero';
import About from './sections/About';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Skills from './sections/Skills';

type Socials = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
};

type PortfolioData = {
  hero?: any;
  about?: any;
  skills?: any;
  resume?: any;
  portfolio?: any;
  contact?: {
    address?: string;
    email?: string;
    phone?: string;
    socials?: Socials;
  };
};

const App = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<keyof PortfolioData | null>(null);
  const [modalMode, setModalMode] = useState<'edit' | 'add-skill' | 'add-project'>('edit');
  const [modalInitial, setModalInitial] = useState<any>({});
  const [modalFields, setModalFields] = useState<
    { label: string; path: string; type?: 'text' | 'number' }[] | undefined
  >(undefined);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });
  }, []);

  const hit = async <T,>(urls: string[], options?: RequestInit): Promise<T> => {
    let lastErr: any;
    for (const url of urls) {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const incoming = await hit<PortfolioData>([
          '/api/portfolio',
          'http://localhost:5000/api/portfolio',
        ]);
        setData(incoming);
      } catch (err) {
        console.warn('API failed, falling back to static JSON', err);
        const res = await fetch('/data/portfolioData.json');
        const incoming = await res.json();
        setData(incoming);
      }
    };
    load();
  }, []);

  const persist = async (next: PortfolioData) => {
    setSaving(true);
    setStatus('Saving...');
    try {
      await hit(
        ['/api/portfolio', 'http://localhost:5000/api/portfolio'],
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        }
      );
      setData(next);
      setStatus('Saved');
    } catch (err) {
      console.error(err);
      setStatus('Save failed – is the API running? (npm run api)');
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 2000);
    }
  };

  const getFieldsForSection = (section: keyof PortfolioData | null) => {
    switch (section) {
      case 'hero':
        return [
          { label: 'Name', path: 'name' },
          { label: 'Title', path: 'title' },
          { label: 'Subtitle', path: 'subtitle' },
          { label: 'CTA Primary', path: 'ctaPrimary' },
          { label: 'CTA Secondary', path: 'ctaSecondary' },
          { label: 'Availability', path: 'availability' },
          { label: 'Location', path: 'location' },
          { label: 'Image filename', path: 'image' },
        ];
      case 'about':
        return [
          { label: 'Title', path: 'title' },
          { label: 'Subtitle', path: 'subtitle' },
          { label: 'Description', path: 'description' },
          { label: 'Image filename', path: 'image' },
          { label: 'City', path: 'info.city' },
          { label: 'Phone', path: 'info.phone' },
          { label: 'Email', path: 'info.email' },
          { label: 'Website', path: 'info.website' },
          { label: 'Birthday', path: 'info.birthday' },
          { label: 'Degree', path: 'info.degree' },
          { label: 'Age', path: 'info.age', type: 'number' },
          { label: 'Freelance', path: 'info.freelance' },
        ];
      case 'contact':
        return [
          { label: 'Address', path: 'address' },
          { label: 'Email', path: 'email' },
          { label: 'Phone', path: 'phone' },
          { label: 'LinkedIn', path: 'socials.linkedin' },
          { label: 'GitHub', path: 'socials.github' },
          { label: 'Twitter', path: 'socials.twitter' },
          { label: 'Instagram', path: 'socials.instagram' },
        ];
      default:
        return undefined; // fallback to JSON editor
    }
  };

  const editSection = (section: keyof PortfolioData) => {
    if (!data) return;
    setModalSection(section);
    setModalMode('edit');
    setModalInitial(data[section] ?? {});
    setModalFields(getFieldsForSection(section));
    setModalOpen(true);
  };

  const addSkill = () => {
    setModalSection('skills');
    setModalMode('add-skill');
    setModalInitial({ name: 'New Skill', level: 75 });
    setModalFields([
      { label: 'Name', path: 'name' },
      { label: 'Level (0-100)', path: 'level', type: 'number' },
    ]);
    setModalOpen(true);
  };

  const addProject = () => {
    setModalSection('portfolio');
    setModalMode('add-project');
    setModalInitial({
      title: 'New Project',
      category: 'filter-app',
      img: 'masonry-portfolio-1.jpg',
    });
    setModalFields([
      { label: 'Title', path: 'title' },
      { label: 'Category (e.g. filter-app)', path: 'category' },
      { label: 'Image filename', path: 'img' },
    ]);
    setModalOpen(true);
  };

  const reload = () => window.location.reload();

  const adminPanelProps: AdminPanelProps = {
    editMode,
    setEditMode,
    saving,
    status,
    onEditHero: () => editSection('hero'),
    onEditAbout: () => editSection('about'),
    onEditResume: () => editSection('resume'),
    onEditSkills: () => editSection('skills'),
    onEditPortfolio: () => editSection('portfolio'),
    onEditContact: () => editSection('contact'),
    onAddSkill: addSkill,
    onAddProject: addProject,
    onReload: reload,
  };

  return (
    <>
      <Header name={data?.hero?.name} socials={data?.contact?.socials} adminPanel={adminPanelProps} />

      <main id="main" className="page-shell">
        {!data ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading your story…</p>
          </div>
        ) : (
          <>
            {data.hero && <Hero data={data.hero} />}
            {data.about && <About data={data.about} />}
            {data.skills && <Skills data={data.skills} />}
            {data.resume && <Resume data={data.resume} />}
            {data.portfolio && <Portfolio data={data.portfolio} />}
            {data.contact && <Contact data={data.contact} />}
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
      <JsonEditorModal
        open={modalOpen}
        title={
          modalMode === 'add-skill'
            ? 'Add Skill'
            : modalMode === 'add-project'
            ? 'Add Project'
            : modalSection || ''
        }
        initial={modalInitial}
        fields={modalFields}
        onClose={() => setModalOpen(false)}
        onSave={(parsed) => {
          if (!data) return;

          if (modalMode === 'add-skill') {
            const skills = [...(data.skills || []), parsed];
            setModalOpen(false);
            persist({ ...data, skills });
            return;
          }

          if (modalMode === 'add-project') {
            const portfolio = [
              ...(data.portfolio || []),
              { id: parsed.id || Date.now(), ...parsed },
            ];
            setModalOpen(false);
            persist({ ...data, portfolio });
            return;
          }

          if (!modalSection) return;
          const next = { ...data, [modalSection]: parsed } as PortfolioData;
          setModalOpen(false);
          persist(next);
        }}
      />
    </>
  );
};

export default App;
