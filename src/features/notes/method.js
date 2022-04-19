import { uploadFilesAPI } from './api/uploadFilesAPI'
import { createNoteAPI } from './api/createNoteAPI'
import { updateNoteAPI } from './api/updateNoteAPI'
import { getNoteAPI } from './api/getNoteAPI'

export const method = async ({ action, data, projectId, authorId, noteId }) => {
  let dataBody = {
    ...data,
    files: null,
    project: projectId,
    author: authorId
  }

  let files = []
  if (data.files?.length) {
    for (const file in data.files) {
      if (typeof data.files[file] === 'object') {
        const fileId = await uploadFilesAPI(data.files[file])
        if (fileId) {
          files.push(fileId)
        }
      }
    }
    if (files.length > 0) {
      dataBody = { ...dataBody, files }
    }
  }

  let res

  if (action === 'create') {
    res = await createNoteAPI(dataBody)
  } else if (action === 'update') {
    const note = await getNoteAPI(noteId)
    const noteFiles = note.attributes.files?.data?.map((file) => file.id)
    if (noteFiles && dataBody.files) {
      dataBody = {
        ...dataBody,
        files: [...dataBody.files, ...noteFiles]
      }
    } else if (noteFiles) {
      dataBody = { ...dataBody, files: [...noteFiles] }
    }
    res = await updateNoteAPI(noteId, dataBody)
  }

  if (res && !res.error) {
    return true
  } else {
    return false
  }
}
