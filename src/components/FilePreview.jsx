import React from 'react';

const FilePreview = ({ fileUrl, fileType }) => {
  if (!fileUrl) return <div>No file selected.</div>;
  if (fileType?.startsWith('image/')) {
    return <img src={fileUrl} alt="Preview" className="max-w-full max-h-64 rounded" />;
  }
  if (fileType === 'application/pdf') {
    return <iframe src={fileUrl} title="PDF Preview" className="w-full h-64" />;
  }
  return <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download File</a>;
};

export default FilePreview; 