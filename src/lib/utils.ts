import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UpladImageCloudinary = async (image: File) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "respite");
  data.append("cloud_name", "dve6avatn");

  const res = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });
  const cloudData = await res.json();
  if (cloudData.error) {
    throw { message: cloudData.error.message };
  }
  return cloudData.url;
};
export const verifyToken = (token: string) => {
  return jwtDecode(token);
};
