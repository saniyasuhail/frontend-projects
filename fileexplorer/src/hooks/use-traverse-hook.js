const useTraverse = () => {
  const insertNode = function (data, folderId, name, isFolder) {
    if (data.id == folderId && data.isFolder) {
      data.items.unshift({
        id: new Date(),
        name,
        isFolder,
        items: []
      });
      return data;
    }
    let node = [];
    node = data.items.map((item) => {
      return insertNode(item, folderId, name, isFolder);
    });
    return { ...data, items: node };
  };

  const deleteNode = (tree, folderId) => {
    const deletedItems = tree.items.filter((obj) => obj.id !== folderId);

    if (deletedItems.length === tree.items.length) {
      const temp = tree.items.map((obj) => deleteNode(obj, folderId));
      return { ...tree, items: temp };
    }

    return { ...tree, items: deletedItems };
  };

  const renameNode = (data, folderId, name) => {
    if (data.id == folderId) {
      data.name = name;
      return data;
    }
    let node = [];
    node = data.items.map((item) => {
      return renameNode(item, folderId, name);
    });
    return { ...data, items: node };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverse;
