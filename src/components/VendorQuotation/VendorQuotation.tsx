import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, CheckCircle, FileText, Filter } from 'lucide-react';
import CreateRFQModal from './CreateRFQModal';
import ApproveRFQModal from './ApproveRFQModal';
import VendorQuotationEntry from './VendorQuotationEntry';
import ApproveQuotationModal from './ApproveQuotationModal';
import GenerateCSTab from './GenerateCSTab';
import ApproveCSTab from './ApproveCSTab';

interface RFQ {
  id: string;
  rfqNo: string;
  deliveryLocation: string;
  vendorOptions: string[];
  rfqDate: string;
  endDate: string;
  approvedBy: string;
  approvedOn: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface VendorQuotation {
  id: string;
  quotationNo: string;
  rfqNo: string;
  requestedBy: string;
  requestedOn: string;
  vendor: string;
  approvedBy: string;
  approvedOn: string;
  status: 'pending' | 'approved' | 'rejected';
}

const VendorQuotation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rfq');
  const [showCreateRFQ, setShowCreateRFQ] = useState(false);
  const [showApproveRFQ, setShowApproveRFQ] = useState(false);
  const [showQuotationEntry, setShowQuotationEntry] = useState(false);
  const [showApproveQuotation, setShowApproveQuotation] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<VendorQuotation | null>(null);
  const [selectedRFQs, setSelectedRFQs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRFQForQuotation, setSelectedRFQForQuotation] = useState('');

  const rfqs: RFQ[] = [
    {
      id: '1',
      rfqNo: 'RFQ-001',
      deliveryLocation: 'Warehouse A',
      vendorOptions: ['Vendor X', 'Vendor Y'],
      rfqDate: '2024-07-10',
      endDate: '2024-07-20',
      approvedBy: 'John Doe',
      approvedOn: '2024-07-11',
      status: 'pending'
    },
    {
      id: '2',
      rfqNo: 'RFQ-002',
      deliveryLocation: 'Warehouse B',
      vendorOptions: ['Vendor A', 'Vendor B', 'Vendor C'],
      rfqDate: '2024-07-12',
      endDate: '2024-07-22',
      approvedBy: 'Jane Smith',
      approvedOn: '2024-07-13',
      status: 'approved'
    }
  ];

  const quotations: VendorQuotation[] = [
    {
      id: '1',
      quotationNo: 'QUO-001',
      rfqNo: 'RFQ-001',
      requestedBy: 'John Doe',
      requestedOn: '2024-07-12',
      vendor: 'Vendor X',
      approvedBy: 'Jane',
      approvedOn: '2024-07-13',
      status: 'pending'
    },
    {
      id: '2',
      quotationNo: 'QUO-002',
      rfqNo: 'RFQ-002',
      requestedBy: 'Alice Johnson',
      requestedOn: '2024-07-14',
      vendor: 'Vendor A',
      approvedBy: 'Bob Wilson',
      approvedOn: '2024-07-15',
      status: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRFQCheckboxChange = (rfqId: string) => {
    setSelectedRFQs(prev => 
      prev.includes(rfqId) 
        ? prev.filter(id => id !== rfqId)
        : [...prev, rfqId]
    );
  };

  const handleSelectAllRFQs = () => {
    setSelectedRFQs(prev => 
      prev.length === rfqs.length ? [] : rfqs.map(rfq => rfq.id)
    );
  };

  const handleApproveRFQ = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setShowApproveRFQ(true);
  };

  const handleApproveQuotation = (quotation: VendorQuotation) => {
    setSelectedQuotation(quotation);
    setShowApproveQuotation(true);
  };

  const filteredRFQs = rfqs.filter(rfq =>
    rfq.rfqNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotations = quotations.filter(quotation =>
    !selectedRFQForQuotation || quotation.rfqNo === selectedRFQForQuotation
  );

  const renderRFQManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowCreateRFQ(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create RFQ</span>
          </button>
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter RFQs by RFQ Number, Delivery Location, Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">RFQ List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRFQs.length === rfqs.length && rfqs.length > 0}
                      onChange={handleSelectAllRFQs}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">RFQ No.</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Delivery Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor Options</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">RFQ Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">End Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Approved By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Approved On</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRFQs.map((rfq) => (
                  <tr key={rfq.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRFQs.includes(rfq.id)}
                        onChange={() => handleRFQCheckboxChange(rfq.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{rfq.rfqNo}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.deliveryLocation}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.vendorOptions.join(', ')}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.rfqDate}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.endDate}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.approvedBy || '-'}</td>
                    <td className="py-4 px-4 text-gray-600">{rfq.approvedOn || '-'}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rfq.status)}`}>
                        {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {rfq.status === 'pending' && (
                          <button 
                            onClick={() => handleApproveRFQ(rfq)}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVendorQuotation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              value={selectedRFQForQuotation}
              onChange={(e) => setSelectedRFQForQuotation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select RFQ*</option>
              {rfqs.map(rfq => (
                <option key={rfq.id} value={rfq.rfqNo}>{rfq.rfqNo}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowQuotationEntry(true)}
            disabled={!selectedRFQForQuotation}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedRFQForQuotation
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Vendor Quotation Entry</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Quotation List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Quotation No.</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">RFQ No.</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Requested By/On</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Approved By/On</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{quotation.quotationNo}</td>
                    <td className="py-4 px-4 text-gray-600">{quotation.rfqNo}</td>
                    <td className="py-4 px-4 text-gray-600">{quotation.requestedBy} / {quotation.requestedOn}</td>
                    <td className="py-4 px-4 text-gray-600">{quotation.vendor}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {quotation.approvedBy ? `${quotation.approvedBy} / ${quotation.approvedOn}` : '-'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                        {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {quotation.status === 'pending' && (
                          <button 
                            onClick={() => handleApproveQuotation(quotation)}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Quotation Management</h1>
          <p className="text-gray-600 mt-1">Manage RFQs, vendor quotations, and comparative statements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'rfq', label: 'RFQ Management' },
              { id: 'quotation', label: 'Vendor Quotation' },
              { id: 'generate-cs', label: 'Generate CS' },
              { id: 'approve-cs', label: 'Approve CS' }
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'rfq' && renderRFQManagement()}
          {activeTab === 'quotation' && renderVendorQuotation()}
          {activeTab === 'generate-cs' && <GenerateCSTab />}
          {activeTab === 'approve-cs' && <ApproveCSTab />}
        </div>
      </div>

      {/* Modals */}
      {showCreateRFQ && (
        <CreateRFQModal 
          isOpen={showCreateRFQ} 
          onClose={() => setShowCreateRFQ(false)} 
        />
      )}

      {showApproveRFQ && selectedRFQ && (
        <ApproveRFQModal 
          isOpen={showApproveRFQ} 
          onClose={() => {
            setShowApproveRFQ(false);
            setSelectedRFQ(null);
          }}
          rfq={selectedRFQ}
        />
      )}

      {showQuotationEntry && (
        <VendorQuotationEntry 
          isOpen={showQuotationEntry} 
          onClose={() => setShowQuotationEntry(false)}
          selectedRFQ={selectedRFQForQuotation}
        />
      )}

      {showApproveQuotation && selectedQuotation && (
        <ApproveQuotationModal 
          isOpen={showApproveQuotation} 
          onClose={() => {
            setShowApproveQuotation(false);
            setSelectedQuotation(null);
          }}
          quotation={selectedQuotation}
        />
      )}
    </div>
  );
};

export default VendorQuotation;