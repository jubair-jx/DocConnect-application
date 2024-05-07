import DashbaordDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashbaordDrawer>{children}</DashbaordDrawer>;
}
