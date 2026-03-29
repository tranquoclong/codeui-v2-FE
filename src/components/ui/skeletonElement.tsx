

function SkeletonElement({ total }: { total :number}) {
  let num = []
  for (var i = 0; i < total; i++) {
    num.push(i)
  }
  return (
    <>
      {num.map((index) => (
        <article
          key={index}
          className='transition-opacity duration-300 relative overflow-hidden text-[var(--maindark)] rounded-lg dark-background z-10 flex h-full flex-col text-black'
          style={{ opacity: 1, willChange: 'auto', transform: 'none' }}
        >
          <div className='h-[350px] rounded-lg bg-[linear-gradient(270deg,#111,#333,#333,#111)] bg-[length:200%_100%] animate-[skeleton-loading_4s_ease-in-out_infinite]'></div>
        </article>
      ))}
    </>
  )
}

export { SkeletonElement }
