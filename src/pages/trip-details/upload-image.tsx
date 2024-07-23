import { Image, LoaderCircle, Trash2 } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface UploadImageProsp {
  tripId: string
}

export function UploadImage({ tripId }: UploadImageProsp) {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState<File | null>()

  async function handleAddImageTrip() {
    if (!image) {
      return
    }
    setFormIsSubmitting(true)
    const response = await api.post(
      `/trips/upload/image/${tripId}`,
      {
        file: image,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    if (response.status === 200) {
      toast.success('Upload realizado')
      setFormIsSubmitting(false)
    } else {
      toast.success('Tente novamente mais tarde')

      setFormIsSubmitting(false)
    }
  }

  function hangleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setImageUrl(URL.createObjectURL(event.target!.files![0]))
    setImage(event.target!.files![0])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Imagens</h2>
        <Image className="size-5 rounded-xl" />
      </div>

      <div className="space-y-4">
        {imageUrl ? (
          <div className="space-y-4">
            <img src={imageUrl} className="w-full" />
            <Button
              onClick={() => {
                setImage(null)
                setImageUrl('')
              }}
              size="full"
              variant="secondary"
            >
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-900"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Clica para selecionar a imagem
                  </span>{' '}
                  ou solta ela neste campo
                </p>
              </div>
              <input
                onChange={hangleImageChange}
                name="image-trip"
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
        )}

        {formIsSubmitting ? (
          <Button disabled variant="primary" size="full">
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button onClick={handleAddImageTrip} variant="primary" size="full">
            Enviar
          </Button>
        )}
      </div>
    </div>
  )
}
