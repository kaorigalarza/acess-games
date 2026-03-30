'use client'

import { useState } from 'react'
import { Game, CartItem } from '@/types'
import Header from '@/components/layout/Header'
import GameCard from '@/components/game/GameCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const FEATURED_GAMES: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    price: 59.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
    rating: 4.5,
    category: 'RPG'
  },
  {
    id: 2,
    title: 'Elden Ring',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
    rating: 4.8,
    category: 'Action'
  },
  {
    id: 3,
    title: 'The Witcher 3',
    price: 39.99,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=300&fit=crop',
    rating: 4.7,
    category: 'RPG'
  },
  {
    id: 4,
    title: 'Starfield',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=300&fit=crop',
    rating: 4.3,
    category: 'Sci-Fi'
  },
  {
    id: 5,
    title: 'Baldur\'s Gate 3',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=300&fit=crop',
    rating: 4.9,
    category: 'RPG'
  },
  {
    id: 6,
    title: 'Hogwarts Legacy',
    price: 49.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=300&fit=crop',
    rating: 4.4,
    category: 'Adventure'
  }
]

const CATEGORIES = [
  { name: 'RPG', emoji: '⚔️' },
  { name: 'Action', emoji: '💥' },
  { name: 'Estratégia', emoji: '♟️' },
  { name: 'Aventura', emoji: '🗺️' },
  { name: 'Puzzle', emoji: '🧩' },
  { name: 'Indie', emoji: '🎮' },
  { name: 'Multiplayer', emoji: '👥' },
  { name: 'Simulação', emoji: '🚗' },
]

const ALL_GAMES: Game[] = [
  ...FEATURED_GAMES,
  {
    id: 7,
    title: 'Palworld',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1535869484c0-e6e99c007bca?w=500&h=300&fit=crop',
    rating: 4.6,
    category: 'Adventure'
  },
  {
    id: 8,
    title: 'Dragon\'s Dogma 2',
    price: 59.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1535869484c0-e6e99c007bca?w=500&h=300&fit=crop',
    rating: 4.5,
    category: 'RPG'
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([]) // Carrinho inicia vazio

  const addToCart = (game: Game) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === game.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: game.id, title: game.title, price: game.price, discount: game.discount, quantity: 1 }]
    })
  }

  const removeFromCart = (gameId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== gameId))
  }

  const updateQuantity = (gameId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId)
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === gameId ? { ...item, quantity } : item
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header 
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663172253136/AAZgeeAnTvmJKKDiRv9n7T/hero-gaming-dark-purple-ewvFPtCaEoHSdVEkbcdTvK.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/50 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              Bem-vindo ao Games Store
            </h1>
            <p className="text-lg md:text-xl text-purple-200 mb-8">
              Descubra os melhores jogos com preços incríveis. Sua próxima aventura começa aqui.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Explorar Catálogo</button>
              <button className="btn-secondary">Ver Ofertas</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-dark-bg to-dark-card/20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              Destaque
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Featured Game Large */}
            <div className="card-game overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img
                  src={FEATURED_GAMES[0].image}
                  alt={FEATURED_GAMES[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{FEATURED_GAMES[0].title}</h3>
                      <span className="inline-block px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-sm font-semibold">
                        {FEATURED_GAMES[0].category}
                      </span>
                    </div>
                    {FEATURED_GAMES[0].discount && (
                      <div className="bg-red-600 px-3 py-2 rounded font-bold text-white">
                        -{FEATURED_GAMES[0].discount}%
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      {FEATURED_GAMES[0].discount && (
                        <span className="text-sm line-through text-purple-400">
                          ${FEATURED_GAMES[0].price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-purple-400">
                        ${(FEATURED_GAMES[0].price * (1 - (FEATURED_GAMES[0].discount || 0) / 100)).toFixed(2)}
                      </span>
                    </div>
                    <button onClick={() => addToCart(FEATURED_GAMES[0])} className="btn-primary">Comprar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Game Grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURED_GAMES.slice(1, 5).map((game) => (
                <div key={game.id} className="card-game overflow-hidden">
                  <div className="relative h-40">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">{game.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-400">
                          ${(game.price * (1 - (game.discount || 0) / 100)).toFixed(2)}
                        </span>
                        {game.discount && (
                          <span className="text-xs bg-red-600 px-2 py-1 rounded font-bold">
                            -{game.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Discounts Section */}
      <section className="py-16 md:py-24 bg-dark-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white" style={{ fontFamily: 'Poppins' }}>
            Descontos em Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_GAMES.filter(game => game.discount).map((game) => (
              <GameCard key={game.id} game={game} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* All Games Section (Carousel) */}
      <section className="py-16 md:py-24 bg-dark-bg overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white" style={{ fontFamily: 'Poppins' }}>
            Catálogo Completo
          </h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {ALL_GAMES.map((game) => (
                <SwiperSlide key={game.id}>
                  <div className="h-full py-2">
                    <GameCard game={game} onAddToCart={addToCart} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-purple">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
            Fique por dentro das novidades
          </h2>
          <p className="text-purple-100 mb-8">
            Receba ofertas exclusivas e lançamentos direto no seu email
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
            />
            <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-dark-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Games Store</h3>
              <p className="text-purple-400 text-sm">
                Sua loja de jogos minimalista com os melhores preços
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-purple-400">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Catálogo</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Ofertas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-purple-400">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Termos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-sm text-purple-400">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border pt-8 text-center text-sm text-purple-500">
            <p>&copy; 2024 Games Store. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
