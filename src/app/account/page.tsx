'use client';
import { useState } from 'react';
import { Package, Heart, MapPin, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const TABS = ['OVERVIEW', 'ORDERS', 'ADDRESSES', 'PAYMENT', 'SETTINGS'] as const;
type Tab = typeof TABS[number];

const MOCK_ORDERS = [
  { id: 'VN-20241201-4821', date: 'December 1, 2024', status: 'Delivered', total: 236, items: ['MatteTrance Lipstick', 'Gilded Nirvana Palette'] },
  { id: 'VN-20241112-3394', date: 'November 12, 2024', status: 'Delivered', total: 128, items: ['Gilded Nirvana Palette'] },
  { id: 'VN-20241028-2217', date: 'October 28, 2024', status: 'Delivered', total: 89, items: ['Glass Veil Serum', 'Legendary Lip Liner'] },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('OVERVIEW');
  const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">

        {/* Header */}
        <div className="border-b border-gold/20 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-2">MY ACCOUNT</p>
            <h1 className="font-cormorant text-[clamp(32px,6vw,56px)] text-white uppercase tracking-[0.05em] font-light leading-none">
              Welcome Back
            </h1>
            <p className="font-jost text-[13px] text-muted mt-2">saurabhalaina@gmail.com</p>
          </div>
          <button className="flex items-center gap-2 font-jost text-[11px] uppercase tracking-[0.15em] text-muted hover:text-gold transition-colors">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar nav */}
          <nav className="lg:w-52 flex-shrink-0">
            <ul className="space-y-1">
              {TABS.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setTab(t)}
                    className={`w-full text-left font-jost text-[12px] uppercase tracking-[0.15em] px-4 py-3 transition-colors flex items-center justify-between ${
                      tab === t ? 'text-gold border-l-2 border-gold bg-gold/5' : 'text-muted hover:text-platinum border-l-2 border-transparent'
                    }`}
                  >
                    {t}
                    <ChevronRight size={12} className="opacity-40" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* OVERVIEW */}
            {tab === 'OVERVIEW' && (
              <div className="space-y-6">
                <h2 className="font-cormorant text-[26px] text-white uppercase tracking-[0.05em] font-light mb-6">Account Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Package, label: 'Orders', value: `${MOCK_ORDERS.length} orders`, action: () => setTab('ORDERS') },
                    { icon: Heart, label: 'Wishlist', value: 'View saved items', href: '/wishlist' },
                    { icon: MapPin, label: 'Addresses', value: '1 saved address', action: () => setTab('ADDRESSES') },
                    { icon: CreditCard, label: 'Payment', value: '1 saved card', action: () => setTab('PAYMENT') },
                  ].map(({ icon: Icon, label, value, action, href }) => (
                    href ? (
                      <Link key={label} href={href} className="flex items-center gap-4 border border-gold/20 p-5 hover:border-gold/50 transition-colors group">
                        <div className="w-10 h-10 border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                          <Icon size={16} className="text-gold" />
                        </div>
                        <div>
                          <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-platinum">{label}</p>
                          <p className="font-jost text-[12px] text-muted mt-0.5">{value}</p>
                        </div>
                        <ChevronRight size={14} className="text-muted ml-auto group-hover:text-gold transition-colors" />
                      </Link>
                    ) : (
                      <button key={label} onClick={action} className="flex items-center gap-4 border border-gold/20 p-5 hover:border-gold/50 transition-colors group text-left">
                        <div className="w-10 h-10 border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                          <Icon size={16} className="text-gold" />
                        </div>
                        <div>
                          <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-platinum">{label}</p>
                          <p className="font-jost text-[12px] text-muted mt-0.5">{value}</p>
                        </div>
                        <ChevronRight size={14} className="text-muted ml-auto group-hover:text-gold transition-colors" />
                      </button>
                    )
                  ))}
                </div>

                {/* Recent order */}
                {MOCK_ORDERS[0] && (
                  <div className="mt-6">
                    <h3 className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-4">MOST RECENT ORDER</h3>
                    <div className="border border-gold/20 p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="font-jost text-[12px] text-platinum">{MOCK_ORDERS[0].id}</p>
                          <p className="font-jost text-[11px] text-muted mt-1">{MOCK_ORDERS[0].date}</p>
                          <p className="font-jost text-[11px] text-muted mt-0.5">{MOCK_ORDERS[0].items.join(', ')}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block font-jost text-[10px] uppercase tracking-wider text-gold border border-gold/40 px-3 py-1 mb-2">{MOCK_ORDERS[0].status}</span>
                          <p className="font-cormorant text-[20px] text-gold">{formatPrice(MOCK_ORDERS[0].total)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ORDERS */}
            {tab === 'ORDERS' && (
              <div>
                <h2 className="font-cormorant text-[26px] text-white uppercase tracking-[0.05em] font-light mb-6">Order History</h2>
                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="border border-gold/20 p-5 hover:border-gold/40 transition-colors">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="font-jost text-[12px] text-platinum">{order.id}</p>
                          <p className="font-jost text-[11px] text-muted mt-1">{order.date}</p>
                          <ul className="mt-2 space-y-0.5">
                            {order.items.map((item) => (
                              <li key={item} className="font-jost text-[12px] text-muted/80">· {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="inline-block font-jost text-[10px] uppercase tracking-wider text-gold border border-gold/40 px-3 py-1 mb-2">{order.status}</span>
                          <p className="font-cormorant text-[22px] text-gold">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gold/10 flex gap-4">
                        <button className="font-jost text-[11px] uppercase tracking-wider text-gold hover:text-gold-light transition-colors">View Details</button>
                        <button className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-platinum transition-colors">Reorder</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES */}
            {tab === 'ADDRESSES' && (
              <div>
                <h2 className="font-cormorant text-[26px] text-white uppercase tracking-[0.05em] font-light mb-6">Saved Addresses</h2>
                <div className="border border-gold/20 p-6 mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-2">DEFAULT</p>
                      <p className="font-jost text-[13px] text-platinum">Saurabh Alaina</p>
                      <p className="font-jost text-[12px] text-muted mt-1">123 Luxury Lane, Suite 400</p>
                      <p className="font-jost text-[12px] text-muted">Mumbai, MH 400001</p>
                      <p className="font-jost text-[12px] text-muted">India</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="font-jost text-[11px] uppercase tracking-wider text-gold hover:text-gold-light transition-colors">Edit</button>
                      <button className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-rose transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
                <button className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-8 py-3 hover:bg-gold/10 transition-colors">
                  + ADD NEW ADDRESS
                </button>
              </div>
            )}

            {/* PAYMENT */}
            {tab === 'PAYMENT' && (
              <div>
                <h2 className="font-cormorant text-[26px] text-white uppercase tracking-[0.05em] font-light mb-6">Payment Methods</h2>
                <div className="border border-gold/20 p-6 mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 border border-gold/30 flex items-center justify-center">
                        <span className="font-jost text-[9px] text-muted uppercase tracking-wider">VISA</span>
                      </div>
                      <div>
                        <p className="font-jost text-[13px] text-platinum">•••• •••• •••• 4242</p>
                        <p className="font-jost text-[11px] text-muted mt-0.5">Expires 12/27</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                      <span className="font-jost text-[10px] uppercase tracking-wider text-gold">Default</span>
                      <button className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-rose transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
                <button className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-8 py-3 hover:bg-gold/10 transition-colors">
                  + ADD PAYMENT METHOD
                </button>
              </div>
            )}

            {/* SETTINGS */}
            {tab === 'SETTINGS' && (
              <div>
                <h2 className="font-cormorant text-[26px] text-white uppercase tracking-[0.05em] font-light mb-6">Account Settings</h2>
                <div className="space-y-6">
                  {[
                    { label: 'First Name', value: 'Saurabh' },
                    { label: 'Last Name', value: 'Alaina' },
                    { label: 'Email Address', value: 'saurabhalaina@gmail.com' },
                    { label: 'Phone Number', value: '+91 98765 43210' },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-gold/10 pb-4">
                      <p className="font-jost text-[10px] uppercase tracking-[0.15em] text-gold mb-1">{label}</p>
                      <p className="font-jost text-[14px] text-platinum">{value}</p>
                    </div>
                  ))}
                  <div className="pt-2 space-y-3">
                    <button className="font-jost text-[11px] uppercase tracking-[0.2em] bg-gold text-black px-8 py-3 hover:bg-gold-light transition-colors">
                      SAVE CHANGES
                    </button>
                    <div className="block">
                      <button className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-rose transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
