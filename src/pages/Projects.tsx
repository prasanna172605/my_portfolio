import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, Shield, Download, Music2, Smartphone } from 'lucide-react';
import type { Project, ThemeMode, Hobby } from '../data';
import { Section, Card } from '../components/Shared';
import { CreativeSparkGenerator } from '../components/CreativeSparkGenerator';

const SnuggleMusicCard: React.FC<{ proj: Project }> = ({ proj }) => {
  const params = new URLSearchParams(window.location.search);
  const paramApk = params.get('apk_url');
  const initialApkUrl = paramApk ? decodeURIComponent(paramApk) : '';

  const [apkUrl, setApkUrl] = useState(initialApkUrl);
  const [apkVersion, setApkVersion] = useState('');
  const [apkSize, setApkSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const fromApp = Boolean(paramApk);

  useEffect(() => {
    if (proj.githubRelease) {
      fetch(proj.githubRelease, { headers: { Accept: 'application/vnd.github+json' } })
        .then(r => r.json())
        .then(data => {
          setApkVersion(data.tag_name ?? '');
          const asset = (data.assets ?? []).find(
            (a: { name: string; browser_download_url: string; size: number }) =>
              a.name.endsWith('.apk') && !a.name.toLowerCase().includes('debug')
          );
          if (asset) {
            if (!paramApk) setApkUrl(asset.browser_download_url);
            setApkSize((asset.size / (1024 * 1024)).toFixed(1));
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, [proj.githubRelease, paramApk]);

  return (
    <article
      className="card"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.10), rgba(15,23,42,0.7))',
        borderColor: 'rgba(124,58,237,0.4)',
        boxShadow: '0 0 40px rgba(124,58,237,0.12)'
      }}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(124,58,237,0.45)'
        }}>
          <Music2 size={24} color="white" />
        </div>
        <div>
          <h3 className="card-title" style={{ margin: 0, color: '#e9d5ff' }}>{proj.title}</h3>
          {apkVersion && (
            <span style={{
              fontSize: '0.72rem', color: '#a78bfa', background: 'rgba(124,58,237,0.15)',
              padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(124,58,237,0.35)',
              fontWeight: 600
            }}>{apkVersion}</span>
          )}
        </div>
      </div>

      {fromApp && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
          borderRadius: '8px', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)',
          color: '#7dd3fc', fontSize: '0.8rem', marginBottom: '12px'
        }}>
          <Smartphone size={14} />
          <span>Update available from your app</span>
        </div>
      )}

      <p className="card-desc" style={{ color: '#c4b5fd', fontSize: '0.88rem', lineHeight: 1.6 }}>{proj.desc}</p>

      <div className="tag-row" style={{ marginBottom: '16px' }}>
        {proj.tags.map((t, i) => (
          <span key={i} className="mini-tag" style={{ borderColor: 'rgba(124,58,237,0.4)', color: '#c4b5fd' }}>{t}</span>
        ))}
      </div>

      {/* APK info row */}
      {!loading && apkSize && (
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap'
        }}>
          {[['📦', apkSize + ' MB'], ['📅', proj.year ?? '2026'], ['📱', 'Android 8+']].map(([icon, val]) => (
            <span key={val} style={{
              fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(15,23,42,0.5)',
              padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(71,85,105,0.4)'
            }}>{icon} {val}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="card-footer" style={{ borderColor: 'rgba(124,58,237,0.2)', gap: '10px', flexWrap: 'wrap' }}>
        <a href={proj.link} target="_blank" rel="noreferrer" className="card-link" style={{ color: '#a78bfa' }}>
          GitHub <ExternalLink size={13} />
        </a>

        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
            <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Fetching…
          </span>
        ) : apkUrl ? (
          <a
            href={apkUrl}
            onClick={() => setDownloading(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '8px 18px', borderRadius: '10px', fontWeight: 700,
              fontSize: '0.88rem', textDecoration: 'none', color: 'white',
              background: downloading
                ? 'linear-gradient(135deg,#16a34a,#15803d)'
                : 'linear-gradient(135deg,#7c3aed,#2563eb)',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
              transition: 'all 0.2s'
            }}
          >
            {downloading ? <Shield size={15} /> : <Download size={15} />}
            {downloading ? 'Downloading…' : `Download APK`}
          </a>
        ) : (
          <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>No APK in release</span>
        )}
      </div>

      {apkUrl && (
        <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: '10px' }}>
          <Shield size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
          Signed APK from official GitHub Release. Open source.
        </p>
      )}
    </article>
  );
};

export const Projects: React.FC<{ mode: ThemeMode, data: typeof import('../data').DATA }> = ({ mode, data }) => {
  const pro = data.professional;
  const per = data.personal;

  return (
    <>
      {mode === 'professional' ? (
        <Section id="projects" title="Featured Projects" subtitle="Academic, simulation, and personal work blending cloud & data.">
          <div className="grid-cols">
            {pro.projects.map((proj: Project, idx: number) => (
              proj.isApp ? (
                <SnuggleMusicCard key={idx} proj={proj} />
              ) : (
                <Card
                  key={idx}
                  title={proj.title}
                  footer={
                    <>
                      <span>📅 {proj.year}</span>
                      {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="card-link">
                          Live Demo <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span style={{ color: '#34d399', fontSize: '0.8rem' }}>✔ Completed</span>
                      )}
                    </>
                  }
                >
                  <p style={{ marginBottom: '16px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>{proj.desc}</p>
                  <div className="tag-row">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="mini-tag">{t}</span>
                    ))}
                  </div>
                </Card>
              )
            ))}
          </div>
        </Section>
      ) : (
        <div className="personal">
          <Section id="works" title="Creative Works" subtitle="Sketches, edits, and imagination.">
            <div className="grid-cols">
              {/* Gemini AI Feature for Personal Mode */}
              <CreativeSparkGenerator />

              {per.works.map((work: Hobby, idx: number) => (
                <Card key={idx} title={work.title} isEmerald={true}>
                  <p style={{ color: '#d1fae5', fontSize: '0.9rem', marginBottom: '16px' }}>{work.desc}</p>
                  <span className="cert-badge" style={{ background: 'rgba(6, 95, 70, 0.8)', borderColor: '#34d399', color: '#6ee7b7', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', display: 'inline-block' }}>
                    {work.meta}
                  </span>
                </Card>
              ))}
            </div>
          </Section>
        </div>
      )}
    </>
  );
};
