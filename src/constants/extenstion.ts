export const getFilename = (url:any) => {
    return url.substr(url.lastIndexOf('/') + 1);
  };
  
export const getExtention = (mime:any) => {
switch (mime) {
  case 'application/pdf':
    return '.pdf';
  case 'image/jpeg':
    return '.jpg';
  case 'image/jpg':
    return '.jpg';
  case 'image/png':
    return '.png';
  default:
    return '.jpg';
}
};