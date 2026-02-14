'use client';

import React, { useState } from 'react';
import { DocumentTag } from '@/types';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface UploadCardProps {
    onUpload: (file: File, tag: DocumentTag) => void;
}

export default function UploadCard({ onUpload }: UploadCardProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedTag, setSelectedTag] = useState<DocumentTag>('purchase');
    const [preview, setPreview] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setPreview('');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            onUpload(selectedFile, selectedTag);
            setSelectedFile(null);
            setPreview('');
            setSelectedTag('purchase');
        }
    };

    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">Document Type</label>
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value as DocumentTag)}
                        className="input-field"
                    >
                        <option value="purchase">Purchase</option>
                        <option value="sales">Sales</option>
                        <option value="expense">Expense</option>
                        <option value="import">Import</option>
                    </select>
                </div>

                <div>
                    <label className="label">Select File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        accept="image/*,.pdf"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF or Images up to 10MB</p>
                        </div>
                    </div>
                </div>

                {selectedFile && (
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-gray-900 mb-2">Selected File:</p>
                        <p className="text-sm text-gray-600">{selectedFile.name}</p>
                        {preview && (
                            <div className="mt-3">
                                <img src={preview} alt="Preview" className="max-h-48 rounded border border-gray-200" />
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!selectedFile}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Upload Document
                </button>
            </form>
        </div>
    );
}
