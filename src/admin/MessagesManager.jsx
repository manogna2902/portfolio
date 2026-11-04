import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import Modal from '../components/Modal.jsx';

export default function MessagesManager({ onShowToast }) {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' or 'unread'
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredMessages = (messages || []).filter(m => {
    if (activeFilter === 'unread') return !m.read;
    return true;
  });

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await markMessageRead(msg.id);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteMessage(deleteConfirmId);
      if (selectedMessage?.id === deleteConfirmId) {
        setSelectedMessage(null);
      }
      if (onShowToast) onShowToast('Message deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting message:', err);
      if (onShowToast) onShowToast('Failed to delete message', 'error');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Contact Messages
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Inquiries and correspondence submitted via your website contact form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#111111] text-white'
                : 'bg-[#F3F3F3] text-[#444444] hover:bg-[#E5E5E5]'
            }`}
          >
            All Messages ({(messages || []).length})
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeFilter === 'unread'
                ? 'bg-[#111111] text-white'
                : 'bg-[#F3F3F3] text-[#444444] hover:bg-[#E5E5E5]'
            }`}
          >
            Unread ({(messages || []).filter(m => !m.read).length})
          </button>
        </div>
      </div>

      {/* Messages List / Details Layout */}
      {filteredMessages.length === 0 ? (
        <div className="py-16 text-center text-[#888888] text-xs">
          <p>No messages match the current filter.</p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 sm:p-5 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !msg.read ? 'bg-[#FAFAFA] font-medium' : 'hover:bg-neutral-50'
              }`}
              onClick={() => handleOpenMessage(msg)}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  !msg.read ? 'bg-red-500' : 'bg-transparent'
                }`} />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#111111] truncate">
                      {msg.name}
                    </span>
                    <span className="text-xs text-[#888888] truncate">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm text-[#333333] font-semibold mt-0.5 truncate">
                    {msg.subject}
                  </h4>
                  <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">
                    {msg.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-[11px] text-[#888888] font-mono">
                  {new Date(msg.timestamp).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmId(msg.id);
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-600 rounded-md transition-colors"
                  title="Delete message"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Reader Modal */}
      <Modal
        isOpen={Boolean(selectedMessage)}
        onClose={() => setSelectedMessage(null)}
        title="Message Details"
        maxWidth="max-w-xl"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#666666]">From:</span>
                <span className="font-bold text-[#111111]">{selectedMessage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Email:</span>
                <a href={`mailto:${selectedMessage.email}`} className="font-bold text-[#111111] hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Subject:</span>
                <span className="font-bold text-[#111111]">{selectedMessage.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Received:</span>
                <span className="font-mono text-[#111111]">{new Date(selectedMessage.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider font-bold text-[#111111] mb-2">Message Content:</h5>
              <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] text-sm text-[#333333] whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
              <button
                onClick={() => setDeleteConfirmId(selectedMessage.id)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
              >
                Delete Message
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#444444]">
            Are you sure you want to permanently delete this contact submission?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
