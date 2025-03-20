import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../navigation/NavigationSidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="h-full">
      <AppSidebar />
      <main className="flex flex-1">{children}</main>
    </SidebarProvider>
  );
}
