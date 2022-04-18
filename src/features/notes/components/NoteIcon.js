import { lazy, Suspense } from 'react'

const getDynamicIcon = (type, size) => {
  let Icon
  if (type === 'image') {
    Icon = lazy(() => import('react-icons/bs').then((icon) => ({ default: icon.BsFillImageFill })))
  } else if (type === 'application') {
    Icon = lazy(() => import('react-icons/gr').then((icon) => ({ default: icon.GrDocumentText })))
  } else if (type === 'audio') {
    Icon = lazy(() => import('react-icons/ai').then((icon) => ({ default: icon.AiFillAudio })))
  } else if (type === 'video') {
    Icon = lazy(() => import('react-icons/bs').then((icon) => ({ default: icon.BsCameraVideo })))
  } else {
    Icon = lazy(() => import('react-icons/gr').then((icon) => ({ default: icon.GrDocumentText })))
  }
  return <Icon size={size} />
}

const NoteIcon = ({ files }) => {
  const type = files[0]?.attributes?.mime.split('/')[0]
  const size = '1.8rem'

  const icon = getDynamicIcon(type, size)

  return <Suspense fallback="">{icon}</Suspense>
}

export default NoteIcon
