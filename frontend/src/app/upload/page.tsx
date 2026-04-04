'use client';

import React, { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { documents } from '@/lib/api';
import { useDropzone } from 'react-dropzone';
import { IconUpload, IconFilePlus, IconCheck, IconX, IconLoader2 } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    let totalProgress = 0;
    
    try {
      for (let i = 0; i < files.length; i++) {
        await documents.uploadDocument(files[i], (progressEvent) => {
          if (progressEvent.total) {
            const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(((i * 100) + currentProgress) / files.length);
          }
        });
      }
      toast.success('All documents uploaded successfully');
      setFiles([]);
      setProgress(0);
    } catch (error) {
      console.error('Upload failed', error);
      toast.error('Failed to upload some documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-hover mb-2">
          Knowledge Ingestion
        </h1>
        <p className="text-text-muted max-w-2xl">
          Upload PDF and TXT documents to build your organization&apos;s context. Documents are automatically chunked, embedded, and stored securely.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragActive
            ? 'border-accent bg-accent/10 border-solid'
            : 'border-border bg-surface hover:border-gray-500 hover:bg-surface/80'
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
          <IconUpload size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">Drag and drop documents</h3>
        <p className="text-text-muted text-sm mb-6">
          Support for .pdf and .txt files. Maximum 20MB per file.
        </p>
        <button className="px-6 py-2.5 bg-background border border-border text-gray-300 font-medium rounded-xl hover:border-accent hover:text-white transition-colors">
          Browse Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-8 border border-border bg-surface rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <IconFilePlus className="text-accent" />
              Selected Files ({files.length})
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-text-muted hover:text-gray-300"
            >
              Clear All
            </button>
          </div>
          
          <ul className="divide-y divide-dark-border max-h-[400px] overflow-y-auto">
            {files.map((file, idx) => (
              <li key={idx} className="px-6 py-4 flex items-center justify-between group">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
                  <p className="text-xs text-text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-2 text-text-muted bg-background rounded-lg opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 transition-all"
                  aria-label="Remove file"
                  disabled={uploading}
                >
                  <IconX size={18} />
                </button>
              </li>
            ))}
          </ul>

          <div className="p-6 bg-background border-t border-border">
            {uploading ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>Uploading documents...</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleUpload}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent to-accent-hover text-black font-bold border-none rounded-xl disabled:opacity-50"
              >
                <IconCheck size={20} />
                Process Documents
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
