import { Link2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface Link {
  id: string
  title: string
  url: string
  trip_id: string
}

interface ImportantLinkProps {
  openCreateImportantLinkModal: () => void
}

export function ImportantLinks({
  openCreateImportantLinkModal,
}: ImportantLinkProps) {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>()

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
  }, [tripId])

  async function handleRemoveLink(linkId: string) {
    const { status } = await api.delete(`links/${linkId}`)
    if (status !== 200) {
      toast.error('Erro ao deletar o link.')
    }
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links?.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={link.url}
                target="_blank"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>

            <div className="flex gap-2.5">
              <Link2 className="text-zinc-400 size-5 shrink-0" />
              <button onClick={() => handleRemoveLink(link.id)}>
                <Trash2 className="text-red-400 size-5 shrink-0" />
              </button>
            </div>
          </div>
        ))}

        <Button
          onClick={openCreateImportantLinkModal}
          variant="secondary"
          size="full"
        >
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </div>
    </div>
  )
}
