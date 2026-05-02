import Link from 'next/link'

const MODULES = [
  { slug: 'savings',      name: 'Savings',      tagline: 'Build the habit of saving and learn which accounts protect your money from inflation.',     color: '#1a3a2a', iconBg: '#eaf3de',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="8" y="22" width="24" height="12" rx="3" fill="#2d6a4f"/><rect x="12" y="16" width="16" height="8" rx="2" fill="#52b788"/><rect x="15" y="10" width="10" height="8" rx="2" fill="#95d5b2"/><rect x="6" y="30" width="28" height="3" rx="1.5" fill="#1a3a2a"/><circle cx="20" cy="13" r="2" fill="#d4a853"/></svg> },
  { slug: 'gold',         name: 'Gold',          tagline: 'Understand physical gold, digital gold, and how gold protects against rupee depreciation.',  color: '#c9a84c', iconBg: '#faeeda',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="7" y="18" width="26" height="10" rx="2" fill="#d4a853"/><rect x="10" y="14" width="20" height="8" rx="2" fill="#e8c56a"/><rect x="13" y="10" width="14" height="7" rx="2" fill="#f0d080"/><rect x="5" y="26" width="30" height="4" rx="2" fill="#b8963e"/></svg> },
  { slug: 'mutual-funds', name: 'Mutual Funds',  tagline: 'Let professional managers invest your money across many assets — starting from Rs. 500.',    color: '#378add', iconBg: '#e6f1fb',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" fill="#b5d4f4"/><circle cx="20" cy="20" r="9" fill="#378add"/><circle cx="20" cy="20" r="5" fill="#185fa5"/><circle cx="20" cy="20" r="2.5" fill="#fff"/></svg> },
  { slug: 'psx',          name: 'PSX Stocks',    tagline: 'Learn how the Pakistan Stock Exchange works and how to start with your first share.',        color: '#1d9e75', iconBg: '#e1f5ee',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="6" y="28" width="4" height="6" rx="1" fill="#1d9e75"/><rect x="12" y="22" width="4" height="12" rx="1" fill="#1d9e75"/><rect x="18" y="17" width="4" height="17" rx="1" fill="#0f6e56"/><rect x="24" y="12" width="4" height="22" rx="1" fill="#0f6e56"/><rect x="30" y="8" width="4" height="26" rx="1" fill="#085041"/><polyline points="8,27 14,21 20,16 26,11 32,7" stroke="#d4a853" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="7" r="2.5" fill="#d4a853"/></svg> },
  { slug: 'budgeting',    name: 'Budgeting',     tagline: 'A simple monthly budget is the most underrated investment tool. Learn the 50/30/20 rule.',   color: '#d85a30', iconBg: '#faece7',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="7" y="8" width="26" height="28" rx="4" fill="#f5c4b3"/><rect x="7" y="8" width="26" height="10" rx="4" fill="#d85a30"/><rect x="7" y="14" width="26" height="4" fill="#d85a30"/><rect x="11" y="22" width="8" height="2.5" rx="1.25" fill="#d85a30"/><circle cx="27" cy="28" r="5" fill="#1a3a2a"/><path d="M25 28 L27 30 L30 26" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
]

const S = {
  wrap:    { minHeight: '100vh', background: '#f4f1eb', fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column' },
  nav:     { background: '#1a3a2a', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'sticky', top: 0, zIndex: 99 },
  nicon:   { width: '32px', height: '32px', background: '#d4a853', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a3a2a', fontSize: '16px', fontWeight: '700' },
  nlink:   { color: '#7aaa8a', fontSize: '13px', fontFamily: 'Arial, sans-serif', textDecoration: 'none' },
  navatar: { width: '34px', height: '34px', borderRadius: '50%', background: '#d4a853', color: '#1a3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: 'Arial, sans-serif' },
  hero:    { background: '#1a3a2a', padding: '3rem 2rem 2.5rem' },
  body:    { maxWidth: '920px', margin: '0 auto', padding: '2.5rem 2rem', flex: 1, width: '100%' },
  grid:    { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' },
  card:    { background: '#fff', border: '0.5px solid #e2ded6', borderRadius: '16px', padding: '1.5rem', position: 'relative', textDecoration: 'none', display: 'block', overflow: 'hidden' },
  footer:  { background: '#1a3a2a', padding: '2.5rem 2rem' },
}

export default function LearnPage() {
  return (
    <div style={S.wrap}>

      {/* Navbar */}
      <nav style={S.nav}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={S.nicon}>M</div>
          <span style={{ color: '#f4f1eb', fontSize: '17px', marginLeft: '10px' }}>Mahfooz</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/dashboard" style={S.nlink}>Dashboard</Link>
          <Link href="/learn"     style={{ ...S.nlink, color: '#d4a853', borderBottom: '1.5px solid #d4a853', paddingBottom: '2px' }}>Learn</Link>
          <Link href="/quiz"      style={S.nlink}>Quiz</Link>
        </div>
        <div style={S.navatar}>U</div>
      </nav>

      {/* Hero */}
      <div style={S.hero}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', color: '#7aaa8a', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', marginBottom: '8px' }}>Learn</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#f4f1eb', fontWeight: '400', lineHeight: 1.2 }}>
            Five modules. <span style={{ color: '#d4a853' }}>One goal.</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#7aaa8a', fontFamily: 'Arial, sans-serif', marginTop: '10px', maxWidth: '480px', lineHeight: '1.7' }}>
            Start from the basics and build real investing confidence — with Pakistani rupee examples at every step.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div style={S.body}>
        <div style={S.grid}>
          {MODULES.map((mod) => (
            <Link key={mod.slug} href={`/learn/${mod.slug}`} style={S.card}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: mod.color, borderRadius: '16px 16px 0 0' }}></div>
              <div style={{ position: 'absolute', top: '16px', right: '16px', width: '24px', height: '24px', borderRadius: '50%', border: '0.5px solid #e2ded6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8a8070', fontFamily: 'Arial, sans-serif' }}>↗</div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: mod.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                {mod.icon}
              </div>
              <p style={{ fontSize: '15px', color: '#1a1a16', marginBottom: '6px' }}>{mod.name}</p>
              <p style={{ fontSize: '12px', color: '#8a8070', lineHeight: '1.6', fontFamily: 'Arial, sans-serif', marginBottom: '1.5rem' }}>{mod.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: mod.color, fontFamily: 'Arial, sans-serif', fontWeight: '500', letterSpacing: '0.05em' }}>START MODULE</span>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={S.footer}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={S.nicon}>M</div>
            <span style={{ color: '#f4f1eb', fontSize: '17px' }}>Mahfooz</span>
          </div>
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', margin: '1.25rem 0' }}></div>
          <span style={{ fontSize: '12px', color: '#7aaa8a', fontFamily: 'Arial, sans-serif' }}>© 2026 Mahfooz. Built for Pakistan.</span>
        </div>
      </footer>

    </div>
  )
}
