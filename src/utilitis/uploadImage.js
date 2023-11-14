

const UPLOAD_PRESET = "mmfwmoe3";
const CLOUDNAME ="dtuncyh4v";

export const sendCloudinary = async (
  uri, 
  progressCB
) => {
  return new Promise((resolve) => {
    const formData = new FormData();
    const fileToSend = {
      uri: uri,
      type: `test/png`,
      name: `test.png`
    };
    formData.append("file", fileToSend);
    formData.append("upload_preset", UPLOAD_PRESET );

    const req = new XMLHttpRequest();
    req.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`);
    req.upload.addEventListener('progress', (e) => {
      progressCB((e.loaded / e.total) * 100);
    });

    req.addEventListener('load', () => {
      const res = JSON.parse(req.response);
      progressCB(0);
      resolve(res.url);
    });

    req.send(formData);
  })
}