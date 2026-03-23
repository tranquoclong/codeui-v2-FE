export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='z-20 w-full border-t bg-background'>
      <div className='max-w-6xl mx-auto px-4 md:px-8 py-10'>
        <div className='text-center text-sm text-foreground'>© {currentYear} codeui. All rights reserved.</div>
      </div>
    </footer>
  )
}
