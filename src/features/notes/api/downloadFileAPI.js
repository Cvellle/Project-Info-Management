export const downloadFileAPI = async ({ path, name, extension }) => {
  console.log(extension)
  fetch('https://cors-anywhere.herokuapp.com/' + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'image/png',
      responseType: 'arraybuffer'
    }
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name)

      // Append to html link element page
      document.body.appendChild(link)

      // Start download
      link.click()

      // Clean up and remove the link
      link.parentNode.removeChild(link)
    })
}
