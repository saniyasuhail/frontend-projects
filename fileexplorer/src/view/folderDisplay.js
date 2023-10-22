import { useState } from "react";
import "../styles.css";

function Folder({
  data,
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
  handleRenameNode = () => {}
}) {
  const [expand, setExpand] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [rename, setRename] = useState(false);

  const [input, setInput] = useState({
    visible: false,
    isFolder: null
  });

  const handleAdd = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setInput({
      visible: true,
      isFolder
    });
  };

  const handleDelete = (e) => {
    setDeleteWarn(true);
  };
  const handleRename = (e) => {
    setRename(true);
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(data.id, e.target.value, input.isFolder);

      setInput({ ...input, visible: false });
    }
  };

  const deleteFileFolder = () => {
    handleDeleteNode(data.id);
    setDeleteWarn(false);
  };

  const renameFileFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(data.id, e.target.value, input.isFolder);

      setRename(false);
    }
    // handleRenameNode(data.id, e.target.value);
  };

  if (data.isFolder) {
    return (
      <div>
        <div
          className="container"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {!rename && <span>🗂️ {data.name}</span>}
          {rename && (
            <div>
              <span>🗂️</span>
              <input
                type="text"
                onKeyDown={renameFileFolder}
                onBlur={() => {
                  setRename(false);
                }}
                autoFocus
                defaultValue={data.name}
              />
            </div>
          )}
          <div>
            <button className="btn" onClick={(e) => handleAdd(e, true)}>
              {" "}
              🗂️
            </button>
            <button className="btn" onClick={(e) => handleAdd(e, false)}>
              📄
            </button>
            <button className="btn" onClick={handleRename}>
              🪄
            </button>
            {data.name !== "root" && (
              <button className="btn" onClick={(e) => handleDelete(e, false)}>
                🗑️
              </button>
            )}
            {deleteWarn && (
              <div className="popUp">
                <div className="deleteContainer">
                  <div>Are you sure you want to delete ?</div>
                  <div className="deleteBtn">
                    <button onClick={() => setDeleteWarn(false)}>Cancel</button>
                    <button onClick={deleteFileFolder}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: 7, display: expand ? "block" : "none" }}>
          {input.visible && (
            <div>
              {input.isFolder ? <span> 🗂️ </span> : <span>📄</span>}
              <input
                type="text"
                onKeyDown={addFolder}
                onBlur={() => {
                  setInput({ ...input, visible: false });
                }}
                autoFocus
              />
            </div>
          )}
          {data.items.map((item) => {
            return (
              <Folder
                // key={data.id}
                data={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else
    return (
      <div>
        {!rename && <span>📄 {data.name}</span>}
        {rename && (
          <div>
            <span>📄</span>
            <input
              type="text"
              onKeyDown={renameFileFolder}
              onBlur={() => {
                setRename(false);
              }}
              autoFocus
              defaultValue={data.name}
            />
          </div>
        )}
        <button className="btn" onClick={handleRename}>
          🪄
        </button>
        <button className="btn" onClick={handleDelete}>
          🗑️
        </button>
        {deleteWarn && (
          <div className="popUp">
            <div className="deleteContainer">
              <div>Are you sure you want to delete ?</div>
              <div className="deleteBtn">
                <button onClick={() => setDeleteWarn(false)}>Cancel</button>
                <button onClick={deleteFileFolder}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Folder;
