export function uploadImgToBase64(img) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.onerror = reject;
  });
}
