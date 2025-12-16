export default function ServicesStrip() {
  const services = [
    { icon: 'fa-paint-roller', title: 'Colors & Painting' },
    { icon: 'fa-film', title: 'Home Theatre' },
    { icon: 'fa-kitchen-set', title: 'Modular Kitchens' },
    { icon: 'fa-couch', title: 'Luxury Seating' },
  ];

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-gold-400 py-16 border-y border-gold-500/20 w-full overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_50%)]"></div>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 group cursor-pointer p-6 rounded-2xl transition-all duration-500 hover:bg-white/5 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gold-500/10 to-gold-600/10 p-4 rounded-full border border-gold-500/30 group-hover:border-gold-500/60 transition-all duration-500">
                <i className={`fa-solid ${service.icon} text-4xl text-gold-400 group-hover:text-gold-300 transition-all duration-500 group-hover:scale-110`}></i>
              </div>
            </div>
            <h3 className="font-semibold text-sm md:text-base text-white group-hover:text-gold-400 transition-colors duration-300">{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

