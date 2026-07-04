import { useState, useEffect } from "react";
import TransactionList from "../Components/TransactionList";
import API from "../services/api";
import TransactionForm from "../Components/TransactionForm";
import ConfirmModal from "../Components/ConfirmModal";

function Transactions() {

  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  // ✅ EDIT STATES
  const [editTransaction, setEditTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [range, setRange] = useState("this_month");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [page, search, filter, range]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get(
        `/api/transactions/?page=${page}&search=${search}&type=${filter}&range=${range}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // ======================
  // ADD SUCCESS
  // ======================
  const handleAddSuccess = async () => {
    await fetchTransactions();
    setShowModal(false);
  };

  // ======================
  // EDIT OPEN
  // ======================
  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setShowEditModal(true);
  };

  // Delete 
  const handleDelete = (transaction) => {
    setDeleteTransaction(transaction);
  };

  // Confrim delete
  const confirmDelete = async () => {
    if (!deleteTransaction) return;

    try {
      await API.delete(`/api/transactions/${deleteTransaction.id}/`);

      await fetchTransactions();

      setDeleteTransaction(null);
    } catch (err) {
      console.error(err.response?.data);
    }
  };
  // ======================
  // EDIT SUCCESS
  // ======================
  const handleEditSuccess = async () => {
    await fetchTransactions();
    setShowEditModal(false);
  };

  return (
    <div className="flex-1 bg-app-bg min-h-screen p-6 transition-colors duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3 w-full max-w-3xl">

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 p-3 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-secondary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="relative">

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl shadow hover:bg-surface-hover transition"
            >
              Filter ▼
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-xl shadow-xl p-5 z-50">

                <h3 className="font-semibold text-text-primary mb-3">
                  Transaction Type
                </h3>

                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-app-bg border border-border rounded-lg p-2 text-text-primary mb-4"
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <h3 className="font-semibold text-text-primary mb-3">
                  Date Range
                </h3>

                <select
                  value={range}
                  onChange={(e) => {
                    setRange(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-app-bg border border-border rounded-lg p-2 text-text-primary"
                >
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="year">This Year</option>
                </select>

              </div>
            )}

          </div>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="ml-4 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-lg shadow transition"
        >
          + Add Transaction
        </button>

      </div>

      {/* Transactions */}
      <TransactionList
        transactions={data?.results || []}
        editable={true}
        deletable={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmModal
        open={!!deleteTransaction}
        title="Delete Transaction"
        message={
          deleteTransaction
            ? `Are you sure you want to delete "${deleteTransaction.category_name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTransaction(null)}
      />


      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          disabled={!data.previous}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg transition ${data.previous
            ? "bg-primary hover:bg-primary-hover text-white"
            : "bg-border text-text-secondary cursor-not-allowed"
            }`}
        >
          Previous
        </button>

        <span className="font-semibold text-text-primary">
          Page {page}
        </span>

        <button
          disabled={!data.next}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg transition ${data.next
            ? "bg-primary hover:bg-primary-hover text-white"
            : "bg-border text-text-secondary cursor-not-allowed"
            }`}
        >
          Next
        </button>

      </div>

      {/* ======================
          ADD MODAL
      ====================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-md p-6">

            <TransactionForm
              mode="create"
              onSuccess={handleAddSuccess}
              onCancel={() => setShowModal(false)}
            />

          </div>
        </div>
      )}

      {/* ======================
          EDIT MODAL
      ====================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-md p-6">

            <TransactionForm
              mode="edit"
              initialData={editTransaction}
              onSuccess={handleEditSuccess}
              onCancel={() => setShowEditModal(false)}
            />

          </div>
        </div>
      )}

    </div>
  );
}

export default Transactions;