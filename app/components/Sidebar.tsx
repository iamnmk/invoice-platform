import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0 text-white p-4">
      <div className="text-xl font-bold mb-8">Invoice Manager</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/invoices" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Invoices
            </Link>
          </li>
          <li>
            <Link href="/payments" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Payments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 