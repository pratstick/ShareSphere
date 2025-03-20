import * as React from "react";
import { FlameIcon, HomeIcon, Minus, Plus, TrendingUpIcon, HandHeart, HelpCircle, User } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import ReddishLogo from "@/images/ShareSphere Full.png";
import Link from "next/link";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";
import CreateNeighborhoodButton from "./header/CreateCommunityButton";

type SidebarData = {
  navMain: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      isActive: boolean;
    }[];
  }[];
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // TODO: get all subreddits from sanity
  const subreddits = await getSubreddits();

  // This is sample data.
  const sidebarData: SidebarData = {
    navMain: [
      {
        title: "Neighborhoods",
        url: "#",
        items:
          subreddits?.map((subreddit) => ({
            title: subreddit.title || "unknown",
            url: `/neighborhood/${subreddit.slug}`,
            isActive: false,
          })) || [],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src={ReddishLogo}
                  alt="ShareSphere"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <CreateNeighborhoodButton />
              </SidebarMenuButton>

              <SidebarMenuButton asChild className="p-5">
                <Link href="/">
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild className="p-5 bg-blue-50 hover:bg-blue-100">
                <Link href="/create-post?type=offer">
                  <HandHeart className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-blue-600">Offer Help</span>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild className="p-5 bg-orange-50 hover:bg-orange-100">
                <Link href="/create-post?type=request">
                  <HelpCircle className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-orange-600">Request Help</span>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild className="p-5">
                <Link href="/popular">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Popular
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="p-5">
                <Link href="/help-needed">
                  <FlameIcon className="w-4 h-4 mr-2" />
                  Help Needed
                </Link>
              </SidebarMenuButton>
              
              <SidebarMenuButton asChild className="p-5">
                <Link href="/user">
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            {sidebarData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
