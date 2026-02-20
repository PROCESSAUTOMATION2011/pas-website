import React from 'react';
const OpportunitiesFilter = () => (
  <section id="opportunities" className="bg-white py-12 px-6">
    <h2 className="text-2xl font-bold mb-6 text-center">Explore Opportunities</h2>
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <select className="px-4 py-2 rounded border border-gray-300"><option>All Locations</option></select>
      <select className="px-4 py-2 rounded border border-gray-300"><option>All Functions</option></select>
      <select className="px-4 py-2 rounded border border-gray-300"><option>All Levels</option></select>
    </div>
    <div className="text-center text-gray-400">[JobList Placeholder]</div>
  </section>
);
export default OpportunitiesFilter; 