import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import FolderTree from "./components/FolderTree";

export default function Home() {

  return (
    <Box>
      <Heading className="text-4xl font-semibold text-center mb-10">Technical Test</Heading>
      <FolderTree />
    </Box>
  );
}
