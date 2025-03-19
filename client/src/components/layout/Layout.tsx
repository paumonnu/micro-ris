import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../navigation/NavigationSidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="h-full">
      <AppSidebar />
      <main className="flex flex-1">{children}</main>
    </SidebarProvider>
  );
}
