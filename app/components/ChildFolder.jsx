import { Box } from "@/components/ui/box";
import FolderTemp from "./FolderTemp";

export default function ChildFolder({ isExpand, hasChildren, folder, onAddChildReq, onDelete }) {
  return (
    <>
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
