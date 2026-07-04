function ConfirmModal({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-surface border border-border rounded-2xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-xl font-bold text-text-primary">
                    {title}
                </h2>

                <p className="mt-3 text-text-secondary">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border border-border hover:bg-surface-hover text-text-primary transition"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;