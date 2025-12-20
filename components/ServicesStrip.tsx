export default function ServicesStrip() {
  const services = [
    { icon: 'fa-paint-roller', title: 'Colors & Painting' },
    { icon: 'fa-film', title: 'Home Theatre' },
    { icon: 'fa-kitchen-set', title: 'Modular Kitchens' },
    { icon: 'fa-couch', title: 'Luxury Seating' },
  ];

  return (
    <section className="bg-royal-700 text-gold-500 py-10 border-b border-royal-600 w-full overflow-hidden">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 group cursor-pointer p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
          >
            <i className={`fa-solid ${service.icon} text-3xl mb-2 group-hover:scale-110 transition-transform duration-300`}></i>
            <h3 className="font-semibold text-sm text-white group-hover:text-gold-400 transition-colors duration-300">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
