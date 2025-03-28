import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { List, LogOutIcon, Plus } from "lucide-react"
import { Link } from "react-router-dom"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Documents",
          url: "dashboard/documents",
        },
        {
          title: "New",
          url: "dashboard/new",
        },
      ],
    },
  ],
}

export function AppSidebar({ activeItem, setActiveItem, ...props }: {
  activeItem: string | null;
  setActiveItem: (item: string) => void;
} & React.ComponentProps<typeof Sidebar>) {

  function handleClick(url: string){
    setActiveItem(url);
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="font-pacifico px-2 text-2xl">DriveNote</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.title.toLowerCase() == activeItem}>
                      <div>
                        { item.title == "New" ? <Plus /> : <List />}
                        <Link to={item.title.toLowerCase()} onClick={() => handleClick(item.title.toLowerCase())}>{item.title}</Link>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div>
              <LogOutIcon />
              <Link to={""}>Logout</Link>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
