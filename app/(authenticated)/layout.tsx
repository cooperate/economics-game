import Header from "@/components/header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <section>{children}</section>
    </div>
  );
}
