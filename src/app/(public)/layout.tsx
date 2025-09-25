
export default function Layout({
    children
  }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='flex min-h-screen w-full flex-col relative'>
			<header className=''>
				<nav className=''>
				</nav>
			</header>
			<main className=''>{children}</main>
		</div>
    )
}