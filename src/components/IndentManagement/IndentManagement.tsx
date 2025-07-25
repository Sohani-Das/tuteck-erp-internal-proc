import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Eye, Edit, Trash2 } from 'lucide-react';
import IndentModal from './IndentModal';

const IndentManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndent, setSelectedIndent] = useState<any>(null);

  const indents = [
    {
      id: 'IND-2024-001',
      title: 'Office Equipment Purchase',
      department: 'Administration',
      requestedBy: 'John Smith',
      amount: '₹2,50,000',
      status: 'pending_approval',
      priority: 'high',
      createdDate: '2024-01-15',
      requiredDate: '2024-02-01'
    },
    {
      id: 'IND-2024-002',
      title: 'IT Infrastructure Upgrade',
      department: 'IT Department',
      requestedBy: 'Sarah Wilson',
      amount: '₹8,75,000',
      status: 'approved',
      priority: 'medium',
      createdDate: '2024-01-12',
      requiredDate: '2024-01-30'
    },
    {
      id: 'IND-2024-003',
      title: 'Marketing Materials',
      department: 'Marketing',
      requestedBy: 'Mike Johnson',
      amount: '₹1,20,000',
      status: 'draft',
      priority: 'low',
      createdDate: '2024-01-10',
      requiredDate: '2024-02-15'
    },
    {
      id: 'IND-2024-004',
      title: 'Safety Equipment',
      department: 'Operations',
      requestedBy: 'Lisa Brown',
      amount: '₹3,40,000',
      status: 'quotation_requested',
      priority: 'high',
      createdDate: '2024-01-08',
      requiredDate: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'quotation_requested': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewIndent = (indent: any) => {
    setSelectedIndent(indent);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Indent Management</h1>
          <p className="text-gray-600 mt-1">Manage purchase requests and approvals</p>
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
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Indent</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Purchase Indents</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search indents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Indent Details</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Priority</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Required Date</th>
                <th className="text-center py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {indents.map((indent) => (
                <tr key={indent.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{indent.title}</p>
                      <p className="text-sm text-gray-500">{indent.id}</p>
                      <p className="text-xs text-gray-400">By {indent.requestedBy}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{indent.department}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{indent.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(indent.status)}`}>
                      {indent.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(indent.priority)}`}>
                      {indent.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{indent.requiredDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleViewIndent(indent)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <IndentModal 
          isOpen={showModal} 
          onClose={() => {
            setShowModal(false);
            setSelectedIndent(null);
          }} 
          indent={selectedIndent}
        />
      )}
    </div>
  );
};

export default IndentManagement;