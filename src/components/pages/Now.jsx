import React from 'react';
import Footer from '../components/Footer';

export default function NowPage({ t, tracks, navigate }) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-medium tracking-tight mb-3">Now</h1>
      <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed mb-8">What I'm currently focused on.</p>
      <Footer t={t} tracks={tracks} navigate={navigate} />
    </main>
  );
}
