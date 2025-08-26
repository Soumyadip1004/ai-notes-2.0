// import { NavDocuments } from "@/components/nav-documents"
// import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/auth";
import NavContent from "./nav-content";

type DocumentType = {
  title: string;
  id: string;
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getUser();

  let documents: DocumentType[] = [];

  if (user) {
    documents = await prisma.notes.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        id: true,
      },
    });
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={20} height={20} />
                <span className="text-base font-semibold">AI Notes 2.0</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <NavContent documents={documents}/>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
