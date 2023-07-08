export default function Error() {
	return (
		<div className='flex items-center h-screen justify-center'>
			<div>
				<h1>Something went wrong!, please try again later</h1>
				<button className='w-32 h-3 rounded-md bg-black text-white'>
					Reload
				</button>
			</div>
		</div>
	);
}
