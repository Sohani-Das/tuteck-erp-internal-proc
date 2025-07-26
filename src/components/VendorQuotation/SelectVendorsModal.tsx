import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SelectVendorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVendorsSelected: (vendors: string[]) => void;
  itemName: string;
}

interface Vendor {
  id: string;
  vendorId: string;
  vendorName: string;
  contactNumber: string;
}

const SelectVendorsModal: React.FC<SelectVendorsModalProps> = ({ 
  isOpen, 
  onClose, 
  onVendorsSelected,
  itemName 
}) => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const vendors: Vendor[] = [
    { id: '1', vendorId: 'V001', vendorName: 'Vendor X', contactNumber: '9876543210' },
    { id: '2', vendorId: 'V002', vendorName: 'Vendor Y', contactNumber: '9876543211' },
    { id: '3', vendorId: 'V003', vendorName: 'Vendor A', contactNumber: '9876543212' },
    { id: '4', vendorId: 'V004', vendorName: 'Vendor B', contactNumber: '9876543213' },
    { id: '5', vendorId: 'V005', vendorName: 'Vendor C', contactNumber: '9876543214' }
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactNumber.includes(searchTerm)
  );

  const handleVendorSelect = (vendorName: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorName) 
        ? prev.filter(name => name !== vendorName)
        : [...prev, vendorName]
    );
  };

  const handleSelectAll = () => {
    setSelectedVendors(prev => 
      prev.length === filteredVendors.length 
        ? [] 
        : filteredVendors.map(vendor => vendor.vendorName)
    );
  };

  const handleSubmit = () => {
    onVendorsSelected(selectedVendors);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Select Vendors for Item</h2>
            <p className="text-sm text-gray-600 mt-1">Item: {itemName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter Vendors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Vendors Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedVendors.length === filteredVendors.length && filteredVendors.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedVendors.includes(vendor.vendorName)}
                        onChange={() => handleVendorSelect(vendor.vendorName)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{vendor.vendorId}</td>
                    <td className="py-3 px-4 text-gray-600">{vendor.vendorName}</td>
                    <td className="py-3 px-4 text-gray-600">{vendor.contactNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No vendors found matching your search criteria.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {selectedVendors.length} of {filteredVendors.length} vendors selected
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              CANCEL
            </button>
            <button 
              onClick={handleSubmit}
              disabled={selectedVendors.length === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedVendors.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVendorsModal;