import API from 'services/axios'

export const uploadLogo = async (img) => {
  try {
    const fd = new FormData()
    fd.append('files', img)
    const response = await API.post('/upload', fd)
    const imageId = response.data[0].id
    return imageId
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
