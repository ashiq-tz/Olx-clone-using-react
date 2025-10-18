import React from 'react'

const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          {message || 'Are you sure you want to delete this ad? This action cannot be undone.'}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white transition"
            style={{ backgroundColor: '#d9534f' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
