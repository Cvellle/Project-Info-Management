import { saveAs } from 'file-saver'

export const downloadFileAPI = async ({ path, name }) => {
  saveAs(path, name)
}
