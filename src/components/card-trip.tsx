import { format } from 'date-fns'
import { ArrowRightIcon, PlaneIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { UsersInTrips } from './users-in-trips'

interface CardTripProps {
  id: string
  destination: string
  ends_at: Date
  starts_at: Date
  participants: {
    id: string
    name: string
  }[]
}

export function CardTrip({
  destination,
  ends_at,
  starts_at,
  participants,
  id,
}: CardTripProps) {
  const navigate = useNavigate()

  const eventStartAndEndDates = {
    from: starts_at,
    to: ends_at,
  }
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null

  return (
    <div className="w-[380px] border rounded-lg border-zinc-700 shadow-shape">
      <div className="bg-[#1c1c1c] rounded-lg overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-[#a3e635] to-[#00b894] flex items-center justify-center">
          <PlaneIcon className="size-10" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Viagem para {destination}</h3>
          <p className="text-gray-400 mb-4">{displayedDate}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {participants.map((participant) => (
                <UsersInTrips name={participant.name} />
              ))}
            </div>
            <button
              onClick={() => {
                navigate(`/trips/${id}`)
              }}
              className="bg-[#a3e635] text-black border-none rounded-md px-4 py-2"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
