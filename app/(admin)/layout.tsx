export default function AdminRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps all admin routes and prevents the public Header/Footer
  // from showing. The admin/admin/layout.tsx will add the admin-specific UI.
  return <>{children}</>;
}
