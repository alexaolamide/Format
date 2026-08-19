import { ImageResponse } from 'next/og';

export const alt = 'Doerforge by Alex Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#f5f7f3', color: '#17211f', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', width: '100%', height: '100%', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, fontWeight: 700 }}><div style={{ background: '#147d70', color: 'white', borderRadius: 16, width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>D</div>Doerforge <span style={{ color: '#697572', fontSize: 18 }}>by Alex Studio</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}><div style={{ color: '#147d70', fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>THE PRACTICAL AI STUDIO</div><div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 800, maxWidth: 850 }}>Make good work feel lighter.</div><div style={{ color: '#697572', fontSize: 26 }}>Focused tools for careers, business, creativity, productivity, and learning.</div></div>
      <div style={{ display: 'flex', gap: 12, color: '#697572', fontSize: 18 }}>Resume builder · Cover letters · Business · Creator · Education</div>
    </div>,
    { ...size }
  );
}
