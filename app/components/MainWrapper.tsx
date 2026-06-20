export default function MainWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="main-content bg-gray-500 col-span-full col-start-4 row-span-full row-start-2 row-end-[-2]">
      {children}
    </main>
  )
}
