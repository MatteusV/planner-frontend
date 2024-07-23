import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { CardTrip } from '../../components/card-trip'
import { Header } from '../../components/header'
import { api } from '../../lib/axios'

interface UserProps {
  id: string
  name: string
  email: string
  image_url?: string
}

interface TripsProps {
  id: string
  destination: string
  ends_at: Date
  starts_at: Date
  is_confirmed: boolean
  image_url?: string
  participants: {
    id: string
    name: string
  }[]
}

export function UserTripsPage() {
  const [user, setUser] = useState<UserProps>()
  const [trips, setTrips] = useState<TripsProps[]>()

  useEffect(() => {
    const token = window.localStorage.getItem('refreshToken')

    async function getDatas(token: string) {
      const { data } = await api.post('/user', { token })
      setUser(data.user)
      const response = await api.get(`/trips/${data.user.id}/`)
      setTrips(response.data.trips)
    }

    if (token) {
      getDatas(token)
    } else {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <Header name={user?.name} imageUrl={user?.image_url} />

      <div className="px-6 py-4 space-y-8">
        <div className="flex flex-col gap-y-3 items-center md:block">
          <h1 className="font-bold text-3xl">Suas viagens:</h1>
          <button className="w-max bg-lime-400 text-black border-none rounded-md px-4 py-2 flex items-center gap-2 hover:bg-lime-500 md:hidden">
            <PlusIcon className="w-5 h-5 mr-2" />
            Criar nova viagem
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-md:justify-center">
          {trips?.map((trip) => (
            <CardTrip
              key={trip.id}
              id={trip.id}
              destination={trip.destination}
              ends_at={trip.ends_at}
              starts_at={trip.starts_at}
              participants={trip.participants}
              image_url={trip.image_url}
            />
          ))}
          {trips?.length === 0 && (
            <p className="text-lg w-max font-semibold text-zinc-300">
              Você não está participando de nenhuma viagem.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
