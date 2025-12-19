import { Phone, Wrench, Droplets, Flame, Wind, Settings, Star, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Wrench className="w-12 h-12 text-[#F4A300]" />,
      title: "Naprawa Instalacji",
      description: "Szybka i profesjonalna naprawa wszelkich awarii hydraulicznych"
    },
    {
      icon: <Flame className="w-12 h-12 text-[#F4A300]" />,
      title: "Montaż Systemów Grzewczych",
      description: "Kompleksowa instalacja i modernizacja systemów grzewczych"
    },
    {
      icon: <Droplets className="w-12 h-12 text-[#F4A300]" />,
      title: "Czyszczenie i Udrażnianie Rur",
      description: "Skuteczne usuwanie blokad i czyszczenie instalacji"
    },
    {
      icon: <Droplets className="w-12 h-12 text-[#F4A300]" />,
      title: "Modernizacja Linii Wodociągowej",
      description: "Wymiana i modernizacja instalacji wodociągowych"
    },
    {
      icon: <Wind className="w-12 h-12 text-[#F4A300]" />,
      title: "Czyszczenie Hydrodynamiczne",
      description: "Profesjonalne czyszczenie rur metodą hydrodynamiczną"
    },
    {
      icon: <Settings className="w-12 h-12 text-[#F4A300]" />,
      title: "Naprawa Kanalizacji Bez Wykopu",
      description: "Nowoczesne metody naprawy bez ingerencji w teren"
    }
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      rating: 5,
      text: "Bardzo profesjonalna obsługa! Awaria została usunięta w rekordowym czasie. Polecam!"
    },
    {
      name: "Piotr Nowak",
      rating: 5,
      text: "Szybka reakcja, uczciwe ceny. Firma godna zaufania. Z pewnością skorzystam ponownie."
    },
    {
      name: "Maria Wiśniewska",
      rating: 5,
      text: "Fachowa pomoc i miła obsługa. Hydraulik rozwiązał problem, którego nikt wcześniej nie umiał."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-[#0052CC]" />
              <span className="ml-2 text-xl font-bold text-[#0052CC]">Hydraulik Warszawa</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#0052CC] transition">Strona Główna</a>
              <a href="#about" className="text-gray-700 hover:text-[#0052CC] transition">O Nas</a>
              <a href="#services" className="text-gray-700 hover:text-[#0052CC] transition">Usługi</a>
              <a href="#area" className="text-gray-700 hover:text-[#0052CC] transition">Obszar Działania</a>
              <button onClick={() => navigate('/gallery')} className="text-gray-700 hover:text-[#0052CC] transition">Galeria</button>
            </div>

            <div className="hidden md:flex items-center">
              <Phone className="w-5 h-5 text-[#F4A300] mr-2" />
              <div className="text-sm">
                <div className="text-gray-600">Nagły Wypadek? Zadzwoń:</div>
                <a href="tel:+48500123456" className="font-bold text-[#0052CC] text-lg">+48 500 123 456</a>
              </div>
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Strona Główna</a>
                <a href="#about" className="text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>O Nas</a>
                <a href="#services" className="text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Usługi</a>
                <a href="#area" className="text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Obszar Działania</a>
                <button onClick={() => { navigate('/gallery'); setMobileMenuOpen(false); }} className="text-gray-700 hover:text-[#0052CC] text-left">Galeria</button>
                <a href="tel:+48500123456" className="font-bold text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Zadzwoń: +48 500 123 456</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="pt-20 text-white relative bg-cover bg-fixed" style={{
        backgroundImage: "url('/2%20copy.jpg')",
        backgroundPosition: '65% center'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] to-[#00AEEF] opacity-75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hydraulik Warszawa – Twój Ekspert od Kanalizacji i Instalacji
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            24/7 Pogotowie Hydrauliczne | Bezpłatna Wycena
          </p>
          <button
            onClick={() => navigate('/contact-form?type=booking')}
            className="bg-gradient-to-r from-[#00AEEF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#00AEEF] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Umów Wizytę Online
          </button>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-6">
                Zaufani Profesjonaliści Hydrauliczni
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Od ponad 15 lat świadczymy kompleksowe usługi hydrauliczne dla klientów indywidualnych
                i firm w Warszawie oraz okolicach. Nasz zespół to certyfikowani specjaliści z wieloletnim
                doświadczeniem, którzy podchodzą do każdego zlecenia z pełnym profesjonalizmem.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Posiadamy wszystkie niezbędne uprawnienia i ubezpieczenia. Gwarantujemy wysoką jakość
                wykonanych usług oraz konkurencyjne ceny. Działamy 24 godziny na dobę, 7 dni w tygodniu,
                aby zapewnić naszym klientom pomoc wtedy, gdy jest najbardziej potrzebna.
              </p>
            </div>
            <div className="relative">
              <img src="/4.jpg" alt="Profesjonalny hydraulik przy pracy" className="rounded-lg h-96 w-full object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] text-center mb-12">
            Awaryjne Usługi Hydrauliczne
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0052CC] text-center mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="area" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] text-center mb-12">
            Profesjonalne Usługi dla Domów i Firm
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Obsługujemy zarówno klientów indywidualnych, jak i przedsiębiorstwa. Niezależnie od
                skali projektu, zapewniamy takie samo wysokie standardy wykonania. Realizujemy zarówno
                drobne naprawy, jak i kompleksowe instalacje w budynkach mieszkalnych, biurowych
                i przemysłowych.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nasz zespół jest gotowy do działania w każdej sytuacji. Dysponujemy nowoczesnym
                sprzętem i sprawdzonymi materiałami od renomowanych producentów.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0052CC] to-[#00AEEF] rounded-lg p-12 text-white text-center">
              <Phone className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">
                Zadzwoń i Umów Wizytę
              </h3>
              <a
                href="tel:+48500123456"
                className="text-4xl font-bold hover:text-[#F4A300] transition block mb-4"
              >
                +48 500 123 456
              </a>
              <p className="text-lg">Dostępni 24/7 | Bezpłatna Wycena</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] text-center mb-12">
            Opinie Zadowolonych Klientów
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#F4A300] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-center mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-[#0052CC] font-bold text-center">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0052CC] to-[#00AEEF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Potrzebujesz Pomocy Hydraulika?
          </h2>
          <p className="text-xl mb-8">
            Zadzwoń Teraz – Interweniujemy 24/7 w Całej Warszawie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+48500123456"
              className="bg-[#F4A300] hover:bg-[#d89000] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Zadzwoń Teraz
            </a>
            <button
              onClick={() => navigate('/contact-form?type=consultation')}
              className="bg-white hover:bg-gray-100 text-[#0052CC] font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Bezpłatna Konsultacja
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0052CC] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Opis Usług</h3>
              <p className="text-gray-300">
                Kompleksowe usługi hydrauliczne dla domów i firm. Naprawy awaryjne, montaż instalacji,
                czyszczenie kanalizacji. Dostępni 24/7.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Dane Kontaktowe</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#F4A300]" />
                  <a href="tel:+48500123456" className="hover:text-[#F4A300]">+48 500 123 456</a>
                </p>
                <p>Email: kontakt@hydraulik-warszawa.pl</p>
                <p>Adres: ul. Przykładowa 123, 00-000 Warszawa</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Mapa Lokalizacji</h3>
              <div className="bg-white/10 rounded-lg p-4 h-32 flex items-center justify-center">
                <p className="text-sm text-gray-300">Obsługujemy całą Warszawę i okolice</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Hydraulik Warszawa. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
