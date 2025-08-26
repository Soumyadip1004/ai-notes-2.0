import SearchDialog from "../search-dialog";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";

export default function NavMain({
  notes,
}: {
  notes: { title: string; id: string }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex items-center gap-2">
          <SearchDialog notes={notes} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
