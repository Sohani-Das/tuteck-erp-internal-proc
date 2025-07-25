import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Eye, FileText, Truck, CheckCircle } from 'lucide-react';

const POManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const purchaseOrders = [
    {
      id: 'PO-2024-001',
      title: 'Office Equipment Purchase',
      vendor: 'TechCorp Solutions Pvt Ltd',
      amount: '₹2,35,000',
      status: 'approved',
      priority: 'high',
      createdDate: '2024-01-15',
      deliveryDate: '2024-02-01',
      paymentTerms: '30 days',
      items: 5,
      progress: 75
    },
    {
      id: 'PO-2024-002',
      title: 'IT Infrastructure Upgrade',
      vendor: 'Innovate India Limited',
      amount: '₈,50,000',
      status: 'pending',
      priority: 'medium',
      createdDate: '2024-01-12',
      deliveryDate: '2024-01-30',
      paymentTerms: '45 days',
      items: 12,
      progress: 25
    },
    {
      id: 'PO-2024-003',
      title: 'Marketing Materials',
      vendor: 'Digital Solutions Enterprise',
      amount: '₹1,15,000',
      status: 'in_transit',
      priority: 'low',
      createdDate: '2024-01-10',
      deliveryDate: '2024-01-25',
      paymentTerms: '15 days',
      items: 3,
      progress: 90
    },
    {
      id: 'PO-2024-004',
      title: 'Safety Equipment',
      vendor: 'Manufacturing Industries Co',
      amount: '₹3,25,000',
      status: 'delivered',
      priority: 'high',
      createdDate: '2024-01-08',
      deliveryDate: '2024-01-22',
      paymentTerms: '30 days',
      items: 8,
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'in_transit': return Truck;
      case 'approved': return FileText;
      default: return FileText;
    }
  };

  const filteredPOs = purchaseOrders.filter(po => {
    if (activeTab === 'all') return true;
    return po.status === activeTab;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PO Management</h1>
          <p className="text-gray-600 mt-1">Manage purchase orders and track deliveries</p>
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
            <span>Create PO</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All POs', count: purchaseOrders.length },
              { id: 'pending', label: 'Pending', count: purchaseOrders.filter(po => po.status === 'pending').length },
              { id: 'approved', label: 'Approved', count: purchaseOrders.filter(po => po.status === 'approved').length },
              { id: 'in_transit', label: 'In Transit', count: purchaseOrders.filter(po => po.status === 'in_transit').length },
              { id: 'delivered', label: 'Delivered', count: purchaseOrders.filter(po => po.status === 'delivered').length }
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
            <h3 className="text-lg font-semibold text-gray-900">Purchase Orders</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search purchase orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredPOs.map((po) => {
              const StatusIcon = getStatusIcon(po.status);
              return (
                <div key={po.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="w-5 h-5 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-900">{po.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                        {po.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{po.amount}</p>
                      <p className="text-sm text-gray-500">{po.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Vendor</p>
                      <p className="font-medium text-gray-900">{po.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created Date</p>
                      <p className="font-medium text-gray-900">{po.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Date</p>
                      <p className="font-medium text-gray-900">{po.deliveryDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Terms</p>
                      <p className="font-medium text-gray-900">{po.paymentTerms}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{po.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${po.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{po.items} items</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        po.priority === 'high' ? 'bg-red-100 text-red-800' :
                        po.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {po.priority} priority
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors">
                        <FileText className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      {po.status === 'in_transit' && (
                        <button className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-800 transition-colors">
                          <Truck className="w-4 h-4" />
                          <span>Track</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POManagement;