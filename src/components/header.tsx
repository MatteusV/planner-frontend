import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { createInitials } from '../utils/create-initials'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface HeaderProps {
  name?: string
  imageUrl?: string
}

export function Header({ imageUrl, name }: HeaderProps) {
  const initials = createInitials(name ?? 'user guest')
  const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1c1c1c] shadow-shape">
      <img src="/logo.svg" alt="plann.er" />
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-lime-400 text-black border-none rounded-md px-4 py-2 flex items-center gap-2 hover:bg-lime-500 max-md:hidden"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Criar nova viagem
        </button>
        <Avatar className="w-10 h-10 border border-lime-400">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
