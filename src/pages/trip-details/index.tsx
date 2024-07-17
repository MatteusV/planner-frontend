import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CreateActivityModal } from './create-activity-modal'
import { ImportantLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destination-and-date-header'
import { ManageGuestsModal } from './manage-guests-modal'
import { CreateImportantLink } from './create-important-links-modal copy'

interface Activities {
  activities: {
    date: Date
    activities: string[]
  }
}

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  const [isCreateImportantLinkModal, setIsCreateImportantLinkModal] =
    useState(false)

  const [isManageGuestsModal, setIsManageGuestsModal] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function openCreateImportantLinkModal() {
    setIsCreateImportantLinkModal(true)
  }

  function closeCreateImportantLinkModal() {
    setIsCreateImportantLinkModal(false)
  }

  function openManageGuestsModal() {
    setIsManageGuestsModal(true)
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModal(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4 max-md:flex-col">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold max-md:text-xl">
              Atividades
            </h2>

            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 max-md:w-max max-md:px-3 max-md:py-2"
            >
              <Plus className="size-5 max-md:size-4" />
              Cadastrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            openCreateImportantLinkModal={openCreateImportantLinkModal}
          />

          <div className="w-full h-px bg-zinc-800" />

          <Guests openManageGuestsModal={openManageGuestsModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateImportantLinkModal && (
        <CreateImportantLink
          closeCreateImportantLinkModal={closeCreateImportantLinkModal}
        />
      )}

      {isManageGuestsModal && (
        <ManageGuestsModal closeManageGuestsModal={closeManageGuestsModal} />
      )}
    </div>
  )
}
