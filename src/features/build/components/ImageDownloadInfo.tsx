import Link from 'next/link'

import { Dialog } from '@/features/ui/Dialog'

interface Props {
  imageDownloadInfo: { imageLink: string; imageName: string } | null
  onClose: () => void
}

export function ImageDownloadInfo({ imageDownloadInfo, onClose }: Props) {
  if (!imageDownloadInfo) return null

  const { imageLink, imageName } = imageDownloadInfo

  return (
    <Dialog
      open={Boolean(imageDownloadInfo)}
      title="Image download"
      maxWidthClass="max-w-lg"
      onClose={onClose}
    >
      <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
        <p>Left-click the image to save it to your device.</p>
        <p>Right-click the image to copy the image and paste it elsewhere.</p>
        <p className="text-red-500">
          Warning: Do not choose{' '}
          <span className="font-bold">Copy Image Location</span> or{' '}
          <span className="font-bold">Copy Image Address</span>, as it could
          crash your browser due to the large data URL of the image.
        </p>
        <a
          href={imageLink}
          target="_blank"
          download={imageName}
          className="text-green-500 hover:text-green-300 hover:underline"
        >
          <img src={imageLink} alt="Your Build Image" />
        </a>
      </div>
    </Dialog>
  )
}