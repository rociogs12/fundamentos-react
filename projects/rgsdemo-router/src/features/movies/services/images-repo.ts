const BASE_URL = "http://localhost:8000";

const UPLOAD_URL = `${BASE_URL}/upload`;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading image");
  }
  const data = await response.json();
  console.log("RAW RESPONSE:", data);

  const imageURL = data.path
    .replace("://", "___TEMP___")
    .replace("//", "/")
    .replace("___TEMP___", "://");
    
  console.log("IMAGE URL:", imageURL);
  return imageURL;
};
