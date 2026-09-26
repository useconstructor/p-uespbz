'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Menu, X, Wheat, Users, CalendarDays, Clock, MapPin,
  Phone, Mail, Instagram, Facebook, ChevronLeft, ChevronRight,
  Star, ArrowDown
} from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: string
  category: string
  image_url: string | null
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
  }, [])

  const testimonials = [
    {
      quote: "El pan de masa madre es incomparable — mi familia desayuna aquí cada sábado desde hace 5 años. No volvería a comprar pan de otro lado.",
      author: "Carmen L.",
      role: "Clienta habitual"
    },
    {
      quote: "Trabajo en una oficina cercana y entro en La Espiga cada mañana. Los croissants son tan frescos que casi puedo saborear la mantequilla desde la puerta.",
      author: "David R.",
      role: "Vecino del barrio"
    },
    {
      quote: "He probado panaderías en toda Europa y el roscón de reyes de La Espiga rivaliza con los mejores. Pura tradición.",
      author: "Ana M.",
      role: "Amante de la gastronomía"
    }
  ]

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Historia', href: '#historia' },
    { label: 'Contacto', href: '#contacto' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        }
      )
      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-light/95 backdrop-blur-sm border-b border-amber/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#inicio" className="font-serif text-2xl text-brown-dark font-bold">
              La Espiga
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-brown hover:text-amber transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="bg-amber hover:bg-amber/90 text-brown-dark">
                <a href="#contacto">Contáctanos</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brown-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Panel */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-cream-light border-b border-amber/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-brown hover:text-amber transition-all duration-300 font-medium ${
                  mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className={`w-full bg-amber hover:bg-amber/90 text-brown-dark transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 60}ms` : '0ms' }}
            >
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contáctanos</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Pan artesanal recién horneado en Panadería La Espiga"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 via-brown-dark/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream-light font-bold mb-4 leading-tight">
              Pan Hecho con Amor, Cada Día
            </h1>
            <p className="text-lg sm:text-xl text-cream/90 mb-8">
              Fermentación artesanal desde 1994 — Ingredientes 100% naturales, sin conservantes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber hover:bg-amber/90 text-brown-dark text-lg px-8">
                <a href="#productos">Ver Productos</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-cream-light text-cream-light hover:bg-cream-light/10 text-lg">
                <a href="#contacto">Ver Ubicación</a>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-8 h-8 text-cream-light/70" />
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Wheat, number: '28', label: 'Años de Tradición' },
              { icon: Users, number: '500+', label: 'Clientes Diarios' },
              { icon: CalendarDays, number: '12', label: 'Variedades de Pan' },
              { icon: Clock, number: '365', label: 'Días Abiertos' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber" />
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber mb-1">
                  {stat.number}
                </div>
                <div className="text-brown text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-20 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown-dark font-bold mb-4">
              Nuestros Productos
            </h2>
            <p className="text-brown text-lg max-w-2xl mx-auto">
              Elaborados cada madrugada con harinas de cultivo sostenible y el cariño de siempre
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id || index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-amber/20 to-cream"
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-gradient-to-br from-amber/30 to-brown/10 flex items-center justify-center">
                    <Wheat className="w-16 h-16 text-amber/50 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="text-brown text-sm mb-1">{product.description}</p>
                    <h3 className="font-serif text-xl text-brown-dark font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-amber font-bold">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About / History Section */}
      <section id="historia" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/feature.png"
                alt="Interior de Panadería La Espiga"
                width={600}
                height={600}
                className="rounded-2xl object-cover w-full shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown-dark font-bold mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-brown text-lg leading-relaxed">
                <p>
                  Desde 1994, La Espiga ha sido el corazón de la panadería tradicional en nuestro barrio.
                  Iniciada por la abuela Rosa con una simple receta y mucha pasión, hoy preparamos cada
                  pan respetando el tiempo de fermentación natural y usando solo harinas de cultivo sostenible.
                </p>
                <p>
                  Cada pieza que sale de nuestro horno es un tributo a la lentitud y la calidad.
                  Creemos que el buen pan no tiene atajos: masa madre viva, fermentación de 48 horas,
                  y el calor de un horno de piedra que ha visto miles de amaneceres.
                </p>
                <p>
                  Hoy, tres generaciones después, seguimos horneando con el mismo amor de siempre.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center text-amber font-serif text-xl font-bold">
                  RE
                </div>
                <div>
                  <p className="font-serif text-brown-dark font-semibold">Fundadora</p>
                  <p className="text-brown text-sm">Rosa Elena, 1994</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Location Section */}
      <section id="contacto" className="py-20 bg-brown-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream-light font-bold mb-6">
                Escríbenos
              </h2>
              {formStatus === 'success' ? (
                <div className="bg-cream/10 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber/20 flex items-center justify-center">
                    <Star className="w-8 h-8 text-amber" />
                  </div>
                  <p className="text-cream-light text-lg">
                    ✓ Mensaje enviado — te contactaremos pronto
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="bg-cream-light/10 border-cream-light/30 text-cream-light placeholder:text-cream-light/50"
                  />
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="bg-cream-light/10 border-cream-light/30 text-cream-light placeholder:text-cream-light/50"
                  />
                  <Textarea
                    placeholder="Tu mensaje"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="bg-cream-light/10 border-cream-light/30 text-cream-light placeholder:text-cream-light/50"
                  />
                  <Button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-amber hover:bg-amber/90 text-brown-dark text-lg py-6"
                  >
                    {formStatus === 'loading' ? 'Enviando…' : 'Enviar Mensaje'}
                  </Button>
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      Error al enviar. Por favor, inténtalo de nuevo.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Location Info */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream-light font-bold mb-6">
                Encuéntranos
              </h2>
              <div className="bg-cream-light/10 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-amber flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-cream-light font-medium">Dirección</p>
                    <p className="text-cream-light/80">Barrio Antiguo, Centro de la Ciudad</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-6 h-6 text-amber flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-cream-light font-medium">Horario</p>
                    <p className="text-cream-light/80">Abierto todos los días desde las 6:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-cream-light font-medium">Teléfono</p>
                    <p className="text-cream-light/80">Usa el formulario para contactarnos</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  src="https://maps.google.com/maps?q=Panaderia+Artesanal+Espana&output=embed"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de La Espiga"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-brown-dark font-bold mb-12 text-center">
            Qué Dicen Nuestros Clientes
          </h2>
          <div className="relative">
            <Card className="border-l-4 border-l-amber bg-cream-light shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber text-amber" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl text-brown-dark leading-relaxed mb-6">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center text-amber font-bold">
                    {testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-brown-dark">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-brown text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-amber/20 hover:bg-amber/30 text-amber transition-colors"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-amber' : 'bg-amber/30'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-amber/20 hover:bg-amber/30 text-amber transition-colors"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brown-dark to-brown">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-bold mb-6">
            El Aroma del Pan Recién Horneado Te Espera
          </h2>
          <p className="text-cream/90 text-lg mb-8 max-w-2xl mx-auto">
            Ven a visitarnos y descubre por qué generaciones de familias confían en La Espiga para su pan de cada día.
          </p>
          <Button asChild size="lg" className="bg-amber hover:bg-amber/90 text-brown-dark text-lg px-12 py-6">
            <a href="#contacto">Visítanos Hoy</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-2xl text-cream-light font-bold mb-4">La Espiga</h3>
              <p className="text-cream/70">
                Pan artesanal desde 1994. Fermentación natural, ingredientes de calidad,
                y el cariño de tres generaciones.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-cream-light mb-4">Navegación</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-cream/70 hover:text-amber transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cream-light mb-4">Contacto</h4>
              <ul className="space-y-2 text-cream/70">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber" />
                  Barrio Antiguo
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber" />
                  Abierto desde las 6:00
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cream-light mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream-light/10 hover:bg-amber/20 text-cream-light hover:text-amber transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream-light/10 hover:bg-amber/20 text-cream-light hover:text-amber transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contacto@laespiga.es"
                  className="p-2 rounded-full bg-cream-light/10 hover:bg-amber/20 text-cream-light hover:text-amber transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-cream-light/20 pt-8 text-center text-cream/50 text-sm">
            <p>© {new Date().getFullYear()} Panadería La Espiga. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
