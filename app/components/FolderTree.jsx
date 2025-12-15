"use client";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import InputModal from "./InputModal";
import { v7 as uuidv7 } from 'uuid';
import FolderTemp from "./FolderTemp";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

export default function FolderTree() {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderParentId, setNewFolderParentId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState(null);
  const toast = useToast();

  const showToast = (title, action = "success") => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action={action} variant="solid">
            <ToastTitle>{title}</ToastTitle>
          </Toast>
        );
      },
    });
  };

  const addChildrenTree = (items, parentId, newFolder) =>
    items.map(item => {
      if (item.id === parentId) return { ...item, children: [...item.children, newFolder] };
      if (item.children.length) return {
        ...item, children: addChildrenTree(item.children, parentId, newFolder)
      }
      return item;
    })


  const deleteChildrenTree = (items, id) => items.filter(item => item.id !== id)
    .map(item => ({ ...item, children: deleteChildrenTree(item.children, id) }));

  const handleAddFolderReq = (parentId) => {
    setNewFolderParentId(parentId);
    setIsDelete(false);
    setIsModalOpen(true);
  }

  const handleAddFolder = (folderName) => {
    const newFolder = { id: uuidv7(), name: folderName, children: [] };

    if (newFolderParentId === null) {
      setFolders(prev => [...prev, newFolder]);
    } else {
      setFolders(prev => addChildrenTree(prev, newFolderParentId, newFolder));
    }
    setNewFolderParentId(null);
    showToast("Folder Created!", "success");
  }

  const handleDelete = (id) => {
    setDeleteFolderId(id);
    setIsDelete(true);
    setIsModalOpen(true);
  }

  const confirmDelete = () => {
    if (deleteFolderId) {
      setFolders(prev => deleteChildrenTree(prev, deleteFolderId));
      showToast("Folder Deleted!", "error");
      setDeleteFolderId(null);
    }
  }

  return (
    <Box className="m-auto w-[75vw] p-[30px] bg-orange-300 rounded-md">
      <Button onPress={() => handleAddFolderReq(null)}>
        <ButtonText>Create Folder</ButtonText>
      </Button>

      <Box className="mt-5">
        {folders.map((folder) => (
          <FolderTemp key={folder.id}
            folder={folder}
            onAddChildReq={handleAddFolderReq}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      <InputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        onAdd={isDelete ? confirmDelete : handleAddFolder}
        isDelete={isDelete} />

      <Text className="text-center text-sm">&#169; Mominul Haque Sagar 2025-{new Date().getFullYear()}</Text>
    </Box>
  )
}
