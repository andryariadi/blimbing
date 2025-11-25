import ASidebar from "@/components/ASidebar";
import Nabvar from "@/components/Navbar";
import QueryProvider from "@/components/Providers/QueryProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Suspense } from "react";

// Pisahkan komponen yang akses cookies
async function LayoutContent({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <QueryProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="b-amber-500 w-full flex">
          <ASidebar />

          <main className="b-lime-600">
            <Nabvar />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </QueryProvider>
  );
}

// Layout utama bungkus dengan Suspense
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
