"use client";

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { useState } from 'react';

export default function InputModal({ isOpen, onClose, onAdd, isDelete }) {

  const [folderName, setFolderName] = useState("");

  const handleSubmit = () => {
    if (folderName.trim()) {
      onAdd(folderName.trim());
      setFolderName("");
      onClose(false);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            {isDelete ? <Heading size="lg">Delete Folder</Heading> : <Heading size="lg">Create Folder</Heading>}
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {isDelete ? (
              <Text>Are you sure you want to delete this folder?</Text>
            ) : (
              <>
                <Text>Please enter your folder name here.</Text>
                <Input>
                  <InputField placeholder="New Folder" type="text"
                    value={folderName} onChange={(e) => setFolderName(e.target.value)}
                  />
                </Input>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {isDelete ? <Button
              variant="outline"
              action="secondary"
              className="mr-3"
              onPress={() => {
                onClose(false);
              }}
            >
              <ButtonText>No</ButtonText>
            </Button> : <Button
              variant="outline"
              action="secondary"
              className="mr-3"
              onPress={() => {
                onClose(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>}
            {isDelete ? (
              <Button
                onPress={() => {
                  onAdd();
                  onClose(false);
                }}
              >
                <ButtonText>Yes</ButtonText>
              </Button>
            ) : (
              <Button
                onPress={handleSubmit}
                disabled={!folderName.trim()}
              >
                <ButtonText>Create</ButtonText>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
