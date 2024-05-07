import dynamic from "next/dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const DashboardComponent = dynamic(
    () => import("@/components/Dashboard/DashboardDrawer/DashboardDrawer"),
    { ssr: false }
  );

  return <DashboardComponent>{children}</DashboardComponent>;
}
