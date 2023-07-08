export default function ProductLoader() {
	return (
		<div className='max-w-4xl mx-auto flex flex-col items-center h-screen'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full'>
				<div className='w-full h-96 animate-pulse bg-slate-300 bg-opacity-70'></div>
				<div className='w-full h-96 animate-pulse bg-slate-300 bg-opacity-70'></div>
				<div className='w-full h-96 animate-pulse bg-slate-300 bg-opacity-70'></div>
			</div>
		</div>
	);
}
