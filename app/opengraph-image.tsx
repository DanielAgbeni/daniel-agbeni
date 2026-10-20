import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const stackPills = ['TypeScript', 'Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'Redis / BullMQ', 'PyTorch Geometric'];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0b',
          color: '#f4f4f5',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          border: '1px solid #27272a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                backgroundColor: '#fb923c',
                color: '#0a0a0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '20px',
              }}
            >
              DA
            </div>
            <span style={{ fontSize: '22px', color: '#a1a1aa', fontWeight: 500 }}>danielagbeni.algiz.tech</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid #27272a',
              backgroundColor: '#141417',
              fontSize: '18px',
              color: '#d4d4d8',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: '#10b981' }} />
            {site.availability}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '980px' }}>
          <div style={{ fontSize: '74px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.04 }}>{site.name}</div>
          <div style={{ fontSize: '36px', fontWeight: 500, color: '#fb923c', letterSpacing: '-0.01em' }}>{site.role}</div>
          <div style={{ fontSize: '24px', color: '#a1a1aa', lineHeight: 1.45, marginTop: '6px' }}>
            Production web &amp; mobile applications, distributed background pipelines and ML-driven network routing.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {stackPills.map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: '1px solid #27272a',
                  backgroundColor: '#141417',
                  fontSize: '17px',
                  color: '#e4e4e7',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
