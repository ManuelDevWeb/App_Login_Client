// Imagen to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // Convert the file to base64 text
    fileReader.readAsDataURL(file);

    // When the file is loaded
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    // If there's an error
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export { convertToBase64 };
