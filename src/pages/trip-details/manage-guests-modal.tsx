import { CheckCheck, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { api } from '../../lib/axios'

interface ManageGuestsModal {
  closeManageGuestsModal: () => void
}

interface Participants {
  id: string
  name: string | null
  is_confirmed: boolean
  email: string
}

export function ManageGuestsModal({
  closeManageGuestsModal,
}: ManageGuestsModal) {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participants[]>()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  async function handleRemoveParticipant(participantId: string) {
    await api.delete(`/participants/${participantId}`)
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Gerenciar convidados</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeManageGuestsModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados estão listados aqui.
          </p>
        </div>

        <Table>
          <TableCaption>Lista de participantes</TableCaption>
          <TableHeader>
            <TableRow className="border-zinc-600">
              <TableHead>Id</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Confirmado</TableHead>
              <TableHead>Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants?.map((participant, index) => (
              <TableRow key={participant.id} className="border-zinc-600">
                <TableCell>{index}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>
                  {participant.name ?? `Convidado ${index}`}
                </TableCell>
                <TableCell>
                  {participant.is_confirmed ? (
                    <CheckCheck className="size-5 text-green-500" />
                  ) : (
                    <X className="size-5 text-red-500" />
                  )}
                </TableCell>

                <TableCell className="space-x-4">
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-red-500 disabled:text-red-950"
                  >
                    <Trash2 className="size-5 " />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
