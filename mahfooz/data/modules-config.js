'use client';

export const MODULE_ICONS = {
  savings: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="22" width="24" height="12" rx="3" fill="#2d6a4f" />
      <rect x="12" y="16" width="16" height="8" rx="2" fill="#52b788" />
      <rect x="15" y="10" width="10" height="8" rx="2" fill="#95d5b2" />
      <rect x="6" y="30" width="28" height="3" rx="1.5" fill="#1a3a2a" />
      <circle cx="20" cy="13" r="2" fill="#d4a853" />
    </svg>
  ),
  gold: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="7" y="18" width="26" height="10" rx="2" fill="#d4a853" />
      <rect x="10" y="14" width="20" height="8" rx="2" fill="#e8c56a" />
      <rect x="13" y="10" width="14" height="7" rx="2" fill="#f0d080" />
      <rect x="5" y="26" width="30" height="4" rx="2" fill="#b8963e" />
    </svg>
  ),
  'mutual-funds': (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" fill="#b5d4f4" />
      <circle cx="20" cy="20" r="9" fill="#378add" />
      <circle cx="20" cy="20" r="5" fill="#185fa5" />
      <circle cx="20" cy="20" r="2.5" fill="#fff" />
    </svg>
  ),
  psx: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="28" width="4" height="6" rx="1" fill="#1d9e75" />
      <rect x="12" y="22" width="4" height="12" rx="1" fill="#1d9e75" />
      <rect x="18" y="17" width="4" height="17" rx="1" fill="#0f6e56" />
      <rect x="24" y="12" width="4" height="22" rx="1" fill="#0f6e56" />
      <rect x="30" y="8" width="4" height="26" rx="1" fill="#085041" />
      <polyline
        points="8,27 14,21 20,16 26,11 32,7"
        stroke="#d4a853"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="7" r="2.5" fill="#d4a853" />
    </svg>
  ),
  budgeting: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="7" y="8" width="26" height="28" rx="4" fill="#f5c4b3" />
      <rect x="7" y="8" width="26" height="10" rx="4" fill="#d85a30" />
      <rect x="7" y="14" width="26" height="4" fill="#d85a30" />
      <rect x="11" y="22" width="8" height="2.5" rx="1.25" fill="#d85a30" />
      <circle cx="27" cy="28" r="5" fill="#1a3a2a" />
      <path d="M25 28 L27 30 L30 26" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export const MODULES = [
  { slug: 'savings', name: 'Savings', desc: 'Save smartly and beat inflation.', bar: '#1a3a2a', bg: '#eaf3de', href: '/learn/savings', tagline: 'Build the habit of saving and learn which accounts protect your money from inflation.' },
  { slug: 'gold', name: 'Gold', desc: 'Invest in gold — physical & digital.', bar: '#c9a84c', bg: '#faeeda', href: '/learn/gold', tagline: 'Understand physical gold, digital gold, and how gold protects against rupee depreciation.' },
  { slug: 'mutual-funds', name: 'Mutual Funds', desc: 'Grow with expert fund managers.', bar: '#378add', bg: '#e6f1fb', href: '/learn/mutual-funds', tagline: 'Let professional managers invest your money across many assets — starting from Rs. 500.' },
  { slug: 'psx', name: 'PSX Stocks', desc: 'Learn Pakistan Stock Exchange basics.', bar: '#1d9e75', bg: '#e1f5ee', href: '/learn/psx', tagline: 'Learn how the Pakistan Stock Exchange works and how to start with your first share.' },
  { slug: 'budgeting', name: 'Budgeting', desc: 'Master the 50/30/20 rule.', bar: '#d85a30', bg: '#faece7', href: '/learn/budgeting', tagline: 'A simple monthly budget is the most underrated investment tool. Learn the 50/30/20 rule.' },
];
