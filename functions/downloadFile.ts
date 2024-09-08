import { toast } from "sonner";

export const downloadFile = async (url: string, extension: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    if (!response.body)
      throw new Error("ReadableStream not yet supported in this browser.");

    const contentLength = response.headers.get("Content-Length");
    if (!contentLength)
      throw new Error("Content-Length response header missing.");

    const reader = response.body.getReader();
    const total = parseInt(contentLength, 10);

    let receivedLength = 0;
    const chunks: Uint8Array[] = [];
    const toastId = toast.loading("Downloading: 0%");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;

      // Display progress
      const percentage = Math.round((receivedLength / total) * 100);
      toast.loading(`Downloading: ${percentage}%`, { id: toastId });
    }

    toast.dismiss(toastId);
    toast.success("Download complete!");

    const blob = new Blob(chunks);
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `surah_${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
    toast.error("Failed to download the file. Please try again later.");
  }
};
