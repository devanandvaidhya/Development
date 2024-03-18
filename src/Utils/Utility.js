

const createImageSrc = (byteData) => {
    if (!byteData) return null;
  
    //const blob = new Blob([new Uint8Array(byteData)], { type: 'image/png' });
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(byteData)))}`;
   // return URL.createObjectURL(blob);
   return dataUrl;
  };
  