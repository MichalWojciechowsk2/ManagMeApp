interface deleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  taskName?: string;
}

const DeleteTaskModal: React.FC<deleteTaskModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  taskName,
}) => {
  const handleDeleteConfirmButton = () => {
    onConfirmDelete();
  };
  if (!isOpen || !taskName) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/6 h-1/5">
        <h2 className="text-xl mb-4 text-gray-800 font-semibold">
          Delete Storie
        </h2>
        <p className="text-gray-700">
          Are you sure you want to delete {taskName}?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirmButton}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
