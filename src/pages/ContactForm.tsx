import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { getSupabase } from '../lib/supabaseClient';

export function ContactForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const consultationType = searchParams.get('type') || 'consultation';

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: consultationType === 'booking' ? 'Umów Wizytę' : 'Bezpłatna Konsultacja',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) {
        setError('Nie udało się wysłać formularza. Spróbuj ponownie.');
        console.error('Submit error:', submitError);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError('Błąd podczas wysyłania. Spróbuj ponownie.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0052CC] to-[#00AEEF] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-12 text-center max-w-md shadow-2xl">
          <CheckCircle className="w-16 h-16 text-[#F4A300] mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#0052CC] mb-4">
            Dziękujemy!
          </h1>
          <p className="text-gray-600 mb-6">
            Otrzymaliśmy Twoją wiadomość. Skontaktujemy się z Tobą wkrótce na podany numer telefonu.
          </p>
          <p className="text-sm text-gray-500">
            Przekierowywanie na stronę główną...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0052CC] to-[#00AEEF] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white hover:text-[#F4A300] transition mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Wróć na stronę główną
        </button>

        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-2">
            {formData.service_type === 'Umów Wizytę' ? 'Umów Wizytę Online' : 'Bezpłatna Konsultacja'}
          </h1>
          <p className="text-gray-600 mb-8">
            Wypełnij formularz poniżej, a nasz zespół skontaktuje się z Tobą jak najszybciej.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Imię i Nazwisko *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                placeholder="Jan Kowalski"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                  placeholder="123 456 789"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 mb-2">
                Rodzaj Usługi *
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
              >
                <option>Naprawa Instalacji</option>
                <option>Montaż Systemów Grzewczych</option>
                <option>Czyszczenie i Udrażnianie Rur</option>
                <option>Modernizacja Linii Wodociągowej</option>
                <option>Czyszczenie Hydrodynamiczne</option>
                <option>Naprawa Kanalizacji Bez Wykopu</option>
                <option>Inne</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Wiadomość
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent resize-none"
                placeholder="Opisz swój problem lub potrzeby..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0052CC] to-[#00AEEF] hover:from-[#00AEEF] hover:to-[#0052CC] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span>Wysyłanie...</span>
              ) : (
                <>
                  <Phone className="w-5 h-5 mr-2" />
                  Wyślij Zapytanie
                </>
              )}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Lub zadzwoń bezpośrednio: <a href="tel:+48500123456" className="font-bold text-[#0052CC] hover:text-[#00AEEF]">+48 500 123 456</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
