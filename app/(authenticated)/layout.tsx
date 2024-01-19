import Header from "@/components/header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <section className="flex flex-col flex-grow overflow-y-auto">
        {children}
      </section>
    </div>
  );
}
