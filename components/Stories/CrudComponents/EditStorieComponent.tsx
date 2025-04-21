import React, { useEffect, useState } from "react";
import { Storie } from "../../../types/stories";

interface EditStorieProps {
  isOpen: boolean;
  onClose: () => void;
  storieToEdit: Storie;
  onSave: () => void;
}

const EditStorieComponent: React.FC<EditStorieProps> = ({
  isOpen,
  onClose,
  storieToEdit,
  onSave,
}) => {
  const [name, setName] = useState<string>(storieToEdit.name);
  const [description, setDescription] = useState<string>(
    storieToEdit.description
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    storieToEdit.priority
  );
  const [state, setState] = useState<"todo" | "doing" | "done">(
    storieToEdit.state
  );
  useEffect(() => {
    if (isOpen) {
      setName(storieToEdit.name);
      setDescription(storieToEdit.description);
      setPriority(storieToEdit.priority);
      setState(storieToEdit.state);
    }
  }, [isOpen, storieToEdit]);
  const handleSave = () => {
    const updatedStorie = {
      ...storieToEdit,
      name,
      description,
      priority,
      state,
    };
    onSave(updatedStorie);
    onClose();
  };
};
