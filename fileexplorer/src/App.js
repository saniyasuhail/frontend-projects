import "./styles.css";
import Folder from "./view/folderDisplay";
import { useState } from "react";
import explorer from "./data/folderData";
import useTraverse from "./hooks/use-traverse-hook";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTraverse();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (folderId, name) => {
    const finalTree = renameNode(explorerData, folderId, name);
    setExplorerData(finalTree);
  };

  return (
    <div>
      <Folder
        data={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  );
}
