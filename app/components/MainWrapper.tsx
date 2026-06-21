export default function MainWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="main-content col-span-full row-start-2 bg-zinc-950 px-4 py-6">{children}</main>
}
