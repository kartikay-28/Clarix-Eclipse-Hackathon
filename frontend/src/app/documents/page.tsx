"use client";

import { useEffect, useState } from "react";
import { documents } from "@/lib/api";
import { DocumentItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FilterType = "All" | "pdf" | "docx" | "csv";

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await documents.getDocuments();
      setDocs(res);
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirmDeleteId === id) {
      // confirmed
      try {
        setDeletingId(id);
        await documents.deleteDocument(id);
        setDocs(docs.filter(d => d.id !== id));
        toast.success("Document deleted");
      } catch (err: any) {
        toast.error(err?.response?.data?.detail || "Failed to delete document");
      } finally {
        setDeletingId(null);
        setConfirmDeleteId(null);
      }
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  const handleChat = (id: string) => {
    // In chat page, handle starting a session with doc
    router.push(`/chat?doc_id=${id}`);
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || doc.file_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="w-full h-full p-8 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Documents</h1>
          <p className="text-[#888] text-sm">{docs.length} documents in your workspace</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-[#111] border border-[#1e1e1e] rounded-lg px-[14px] py-2 text-[13px] text-[#F5F5F5] w-[280px] outline-none focus:border-[#00B4D8]"
          />

          <div className="flex gap-2">
            {(["All", "pdf", "docx", "csv"] as FilterType[]).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-[6px] text-xs rounded-full border transition-colors ${
                  filterType === type
                    ? "bg-[#0d2e38] text-[#00B4D8] border-[#1a4a5a]"
                    : "bg-[#111] border-[#1e1e1e] text-[#555]"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 rounded-md anim-shimmer bg-[#111]" />
            ))}
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <svg className="w-12 h-12 text-[#222]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[#F5F5F5] font-medium">No documents yet</span>
              <span className="text-[#555] text-sm">Upload your first document to get started</span>
            </div>
            <button onClick={() => router.push("/upload")} className="px-5 py-[10px] rounded-lg bg-[#00B4D8] text-[#0D0D0D] font-medium text-sm hover:opacity-90">
              Upload Document
            </button>
          </div>
        ) : (
          <div className="bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden flex-1 flex flex-col">
            <div className="bg-[#0D0D0D] border-b border-[#1e1e1e] px-5 py-3 grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr] text-[11px] text-[#444] uppercase tracking-wider">
              <div>File Name</div>
              <div>Type</div>
              <div>Size</div>
              <div>Uploaded By</div>
              <div>Date</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredDocs.map(doc => {
                const dateStr = new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                return (
                  <div key={doc.id} className="px-5 py-[14px] border-b border-[#111] hover:bg-[#0a0a0a] transition-colors grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr] items-center text-[13px]">
                    
                    {/* File Name */}
                    <div className="flex items-center gap-[10px] overflow-hidden pr-4">
                      <div className={`w-7 h-7 rounded flex items-center justify-center font-bold text-[9px] shrink-0
                        ${doc.file_type === 'pdf' ? 'bg-[#2a1010] text-[#ff6b6b]' : 
                          doc.file_type === 'docx' ? 'bg-[#0d1a2e] text-[#4d9fff]' : 
                          'bg-[#0d2010] text-[#4dff91]'}`}
                      >
                        {doc.file_type.toUpperCase()}
                      </div>
                      <span className="text-[#F5F5F5] font-medium truncate">{doc.file_name}</span>
                    </div>

                    {/* Type Pill */}
                    <div>
                      <span className={`text-[11px] px-2 py-[3px] rounded border
                        ${doc.file_type === 'pdf' ? 'bg-[#2a1010] text-[#ff6b6b] border-[#3a1515]' : 
                          doc.file_type === 'docx' ? 'bg-[#0d1a2e] text-[#4d9fff] border-[#1a2a4a]' : 
                          'bg-[#0d2010] text-[#4dff91] border-[#1a3a20]'}`}
                      >
                        {doc.file_type.toUpperCase()}
                      </span>
                    </div>

                    {/* Size */}
                    <div className="text-[#666] text-xs">{doc.file_size_formatted}</div>

                    {/* Uploaded By */}
                    <div className="text-[#888] truncate pr-4">{doc.uploaded_by_name}</div>

                    {/* Date */}
                    <div className="text-[#555] text-xs">{dateStr}</div>

                    {/* Status */}
                    <div className="flex items-center">
                      <span className={`flex items-center gap-[6px] px-2 py-[2px] rounded-full text-xs font-medium w-fit
                        ${doc.status === 'ready' ? 'bg-[#0d2010] text-[#4dff91]' :
                          doc.status === 'processing' ? 'bg-[#2a2010] text-[#ffb347]' :
                          'bg-[#2a1010] text-[#ff6b6b]'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          doc.status === 'ready' ? 'bg-[#4dff91]' :
                          doc.status === 'processing' ? 'bg-[#ffb347] animate-pulse-dot' :
                          'bg-[#ff6b6b]'
                        }`} />
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleChat(doc.id)} className="bg-[#0d2e38] text-[#00B4D8] border border-[#1a4a5a] px-3 py-1.5 rounded-md text-[11px] hover:opacity-80">
                        Chat
                      </button>
                      
                      {doc.can_delete && (
                        <button 
                          onClick={() => handleDelete(doc.id)}
                          disabled={deletingId === doc.id}
                          className={`px-3 py-1.5 rounded-md text-[11px] border transition-colors ${
                            confirmDeleteId === doc.id 
                              ? 'bg-[#2a1010] text-[#ff6b6b] border-[#3a1515]' 
                              : 'bg-transparent text-[#555] border-[#1e1e1e] hover:text-[#fff]'
                          } ${deletingId === doc.id ? 'opacity-50 cursor-wait' : ''}`}
                        >
                          {confirmDeleteId === doc.id ? 'Confirm?' : 'Delete'}
                        </button>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}