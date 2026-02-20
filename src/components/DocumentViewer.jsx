import React from 'react';

const DocumentViewer = ({ fileUrl, fileType }) => {
  if (!fileUrl) return <div>No document selected.</div>;
  if (fileType === 'application/pdf') {
    return <iframe src={fileUrl} title="PDF Viewer" className="w-full h-96" />;
  }
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return <div className="text-gray-500">DOCX preview not supported. <a href={fileUrl} className="text-blue-600 underline">Download</a></div>;
  }
  if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return <div className="text-gray-500">XLSX preview not supported. <a href={fileUrl} className="text-blue-600 underline">Download</a></div>;
  }
  return <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download Document</a>;
};

export default DocumentViewer; 