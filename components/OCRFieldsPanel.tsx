import React from 'react';
import { OCRData } from '@/types';

interface OCRFieldsPanelProps {
    data: OCRData;
    editable?: boolean;
    onChange?: (data: OCRData) => void;
}

export default function OCRFieldsPanel({ data, editable = false, onChange }: OCRFieldsPanelProps) {
    const handleFieldChange = (field: keyof OCRData, value: any) => {
        if (onChange) {
            onChange({ ...data, [field]: value });
        }
    };

    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Fields</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Vendor Name</label>
                    {editable ? (
                        <input
                            type="text"
                            value={data.vendorName}
                            onChange={(e) => handleFieldChange('vendorName', e.target.value)}
                            className="input-field"
                        />
                    ) : (
                        <p className="text-sm text-gray-900 font-medium">{data.vendorName}</p>
                    )}
                </div>

                <div>
                    <label className="label">GST Number</label>
                    {editable ? (
                        <input
                            type="text"
                            value={data.gst}
                            onChange={(e) => handleFieldChange('gst', e.target.value)}
                            className="input-field"
                        />
                    ) : (
                        <p className="text-sm text-gray-900 font-medium">{data.gst}</p>
                    )}
                </div>

                <div>
                    <label className="label">Invoice Number</label>
                    {editable ? (
                        <input
                            type="text"
                            value={data.invoiceNo}
                            onChange={(e) => handleFieldChange('invoiceNo', e.target.value)}
                            className="input-field"
                        />
                    ) : (
                        <p className="text-sm text-gray-900 font-medium">{data.invoiceNo}</p>
                    )}
                </div>

                <div>
                    <label className="label">Date</label>
                    {editable ? (
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => handleFieldChange('date', e.target.value)}
                            className="input-field"
                        />
                    ) : (
                        <p className="text-sm text-gray-900 font-medium">{data.date}</p>
                    )}
                </div>

                <div>
                    <label className="label">Total Amount</label>
                    {editable ? (
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => handleFieldChange('amount', parseFloat(e.target.value))}
                            className="input-field"
                        />
                    ) : (
                        <p className="text-sm text-gray-900 font-medium">₹{data.amount.toLocaleString('en-IN')}</p>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <label className="label">Line Items</label>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">₹{item.rate.toLocaleString('en-IN')}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">₹{item.amount.toLocaleString('en-IN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
