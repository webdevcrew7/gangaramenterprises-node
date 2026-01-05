export default function ServicesStrip() {
  return (
    <section className="bg-royal-700 text-gold-500 py-10 border-b border-royal-600 w-full overflow-hidden">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center gap-2 group cursor-default">
          <i className="fa-solid fa-paint-roller text-3xl mb-2"></i>
          <h3 className="font-semibold text-sm text-white">Colors & Painting</h3>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-default">
          <i className="fa-solid fa-film text-3xl mb-2"></i>
          <h3 className="font-semibold text-sm text-white">Home Theatre</h3>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-default">
          <i className="fa-solid fa-kitchen-set text-3xl mb-2"></i>
          <h3 className="font-semibold text-sm text-white">Modular Kitchens</h3>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-default">
          <i className="fa-solid fa-couch text-3xl mb-2"></i>
          <h3 className="font-semibold text-sm text-white">Luxury Seating</h3>
        </div>
      </div>
    </section>
  )
}

