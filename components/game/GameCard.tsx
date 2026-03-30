'use client'

import { Star } from 'lucide-react'
import { Game } from '@/types'

interface GameCardProps {
  game: Game
  onAddToCart: (game: Game) => void
}

export default function GameCard({ game, onAddToCart }: GameCardProps) {
  const finalPrice = game.price * (1 - (game.discount || 0) / 100)

  return (
    <div className="card-game overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark-bg/80 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">{game.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{game.title}</h3>
        <p className="text-sm text-purple-400 mb-4">{game.category}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            {game.discount && (
              <span className="text-sm line-through text-purple-500">
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-purple-400">
              ${finalPrice.toFixed(2)}
            </span>
          </div>
          {game.discount && (
            <span className="text-xs bg-red-600 px-2 py-1 rounded font-bold">
              -{game.discount}%
            </span>
          )}
        </div>
        <button 
          onClick={() => onAddToCart(game)} 
          className="w-full btn-primary text-sm"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
