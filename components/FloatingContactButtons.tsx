export default function FloatingContactButtons() {
  return (
    <div className="floating-contact-buttons fixed bottom-8 right-5 z-[100] hidden md:flex flex-col gap-3">
      <a href="tel:+919640044469"
        className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg border-2 border-white transition-all duration-300 ease-out flex items-center justify-center hover:shadow-2xl hover:-translate-y-1">
        <i className="fa-solid fa-phone text-xl"></i>
      </a>
      <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg border-2 border-white transition-all duration-300 ease-out flex items-center justify-center hover:shadow-2xl hover:-translate-y-1">
        <i className="fa-brands fa-whatsapp text-2xl"></i>
      </a>
    </div>
  )
}

