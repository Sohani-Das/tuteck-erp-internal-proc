import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Eye, MessageSquare, CheckCircle } from 'lucide-react';

const VendorQuotation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const quotations = [
    {
      id: 'RFQ-2024-001',
      title: 'Office Equipment Purchase',
      vendor: 'TechCorp Solutions Pvt Ltd',
      amount: '₹2,35,000',
      status: 'submitted',
      priority: 'high',
      submittedDate: '2024-01-15',
      validUntil: '2024-02-15',
      responseTime: '2 days',
      items: 5
    },
    {
      id: 'RFQ-2024-002',
      title: 'IT Infrastructure Upgrade',
      vendor: 'Innovate India Limited',
      amount: '₹8,50,000',
      status: 'under_review',
      priority: 'medium',
      submittedDate: '2024-01-12',
      validUntil: '2024-02-12',
      responseTime: '5 days',
      items: 12
    },
    {
      id: 'RFQ-2024-003',
      title: 'Marketing Materials',
      vendor: 'Digital Solutions Enterprise',
      amount: '₹1,15,000',
      status: 'pending',
      priority: 'low',
      submittedDate: '2024-01-10',
      validUntil: '2024-02-10',
      responseTime: '7 days',
      items: 3
    },
    {
      id: 'RFQ-2024-004',
      title: 'Safety Equipment',
      vendor: 'Manufacturing Industries Co',
      amount: '₹3,25,000',
      status: 'approved',
      priority: 'high',
      submittedDate: '2024-01-08',
      validUntil: '2024-02-08',
      responseTime: '1 day',
      items: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuotations = quotations.filter(q => {
    if (activeTab === 'all') return true;
    return q.status === activeTab;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Quotation Management</h1>
          <p className="text-gray-600 mt-1">Manage vendor quotes and RFQ responses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Send RFQ</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Quotations', count: quotations.length },
              { id: 'pending', label: 'Pending', count: quotations.filter(q => q.status === 'pending').length },
              { id: 'submitted', label: 'Submitted', count: quotations.filter(q => q.status === 'submitted').length },
              { id: 'under_review', label: 'Under Review', count: quotations.filter(q => q.status === 'under_review').length },
              { id: 'approved', label: 'Approved', count: quotations.filter(q => q.status === 'approved').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quotation Requests</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotations..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredQuotations.map((quotation) => (
              <div key={quotation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-semibold text-gray-900">{quotation.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                      {quotation.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{quotation.amount}</p>
                    <p className="text-sm text-gray-500">{quotation.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Vendor</p>
                    <p className="font-medium text-gray-900">{quotation.vendor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted Date</p>
                    <p className="font-medium text-gray-900">{quotation.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valid Until</p>
                    <p className="font-medium text-gray-900">{quotation.validUntil}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="font-medium text-gray-900">{quotation.responseTime}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{quotation.items} items</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quotation.priority === 'high' ? 'bg-red-100 text-red-800' :
                      quotation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {quotation.priority} priority
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Compare</span>
                    </button>
                    {quotation.status === 'submitted' && (
                      <button className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-800 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorQuotation;