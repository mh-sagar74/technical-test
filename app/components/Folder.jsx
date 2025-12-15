
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { AddIcon, TrashIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text/index.web';
import { Folder, FolderClosed, FolderOpen } from 'lucide-react';
import { useState } from 'react';


export default function FolderTemp({ folder, onAddChildReq, onDelete }) {
  const [isExpand, setIsExpand] = useState(false);
  const hasChildren = folder.children && folder.children.length > 0;

  return (
    <>
      <Box className="flex flex-row items-center justify-between bg-gray-100 mb-3 px-[15px] py-[10px] rounded-md cursor-pointer"
        onClick={() => setIsExpand(!isExpand)}>
        <Box className="flex flex-row items-center gap-2">
          {hasChildren ? (isExpand ? <FolderOpen /> : <FolderClosed />) : <Folder />}
          <Text>{folder.name}</Text>
        </Box>

        <Box className="flex flex-row gap-3">
          <Button onPress={() => onAddChildReq(folder.id)}
            size="xs">
            <ButtonIcon as={AddIcon} />
          </Button>
          <Button size="xs" onPress={() => onDelete(folder.id)}>
            <ButtonIcon as={TrashIcon} />
          </Button>
        </Box>
      </Box>

      {isExpand && hasChildren && (
        <Box className="ml-6">
          {folder.children.map(child => (
            <FolderTemp
              key={child.id}
              folder={child}
              onAddChildReq={onAddChildReq}
              onDelete={onDelete}
            />
          ))}
        </Box>
      )}
    </>
  )
}
