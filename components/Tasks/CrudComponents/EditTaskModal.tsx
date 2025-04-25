import React, { useEffect, useState } from "react";
import { Task } from "../../../types/task";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task;
  onSave: (editedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}) => {
  const [name, setName] = useState<string>(taskToEdit.name);
  const [description, setName] = useState<string>(taskToEdit.name);
  const [priority, setName] = useState<string>(taskToEdit.name);
  const [state, setName] = useState<string>(taskToEdit.name);
  const [responsibleUserId, setName] = useState<string>(taskToEdit.name);
};
