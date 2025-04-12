import React, { useState } from "react";
import { Storie } from "../../../types/stories";
import UserService from "../../../services/UserService";
import { User } from "../../../types/user";

interface AddStoriesProps {
  isClicked: boolean;
  onClose: () => void;
  onSave: (newStorie: Storie) => void;
  projectIdFromMainPage: string;
}
const AddStoriesComponent: React.FC<AddStoriesProps> = ({
  isClicked,
  onClose,
  onSave,
  projectIdFromMainPage,
}) => {
  const [newStorie, setNewStorie] = useState<Storie>({
    id: "",
    name: "",
    description: "",
    priority: "low",
    projectId: "",
    createDate: null,
    state: "todo",
    owner: "",
  });
  const [user, setUser] = useState<User>(UserService.getMockedUser()); //Think about useEffect
  const handleAddNewStorie = () => {
    if (
      newStorie.name &&
      newStorie.description &&
      newStorie.priority &&
      newStorie.state
    ) {
      newStorie.id = Math.random().toString(36).substring(2, 9);
      newStorie.createDate = new Date();
      newStorie.owner = user.id;
      newStorie.projectId = projectIdFromMainPage;
      onSave(newStorie);
      setNewStorie(newStorie);
      onClose();
    }
  };
  return (
    isClicked && (
      <div>
        <h2>Add New Storie</h2>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={newStorie.name}
              onChange={(e) =>
                setNewStorie({ ...newStorie, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={newStorie.description}
              onChange={(e) =>
                setNewStorie({ ...newStorie, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>Priority</label>
            <select>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label>State</label>
            <select>
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAddNewStorie}>Save</button>
        </div>
      </div>
    )
  );
};

export default AddStoriesComponent;
