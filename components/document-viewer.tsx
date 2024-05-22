import { useCallback } from "react";
import { FaFilePdf } from "react-icons/fa";

interface PdfViewerProps {
  url: string;
  name: string;
  size: number;
  icon?: any;
}
export const DocumentViewer: React.FC<PdfViewerProps> = ({
  url,
  name,
  size,
  icon: Icon,
}) => {
  const handleDownload = useCallback(() => {
    window.open(url, "_blank");
  }, [url]);
  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const formattedSize = formatBytes(size);

  return (
    <button
      className="bg-electric-violet-600 relative p-4 rounded-md max-w-36  md:max-w-52  text-white  flex items-center "
      onClick={handleDownload}
    >
      <Icon className="absolute" size={28} />
      <div className="flex flex-col text-start truncate pl-8">
        <span className="truncate text-sm">{name}</span>
        <span className="text-[.75rem] truncate text-electric-violet-50 ">
          {formattedSize}
        </span>
      </div>
    </button>
  );
};
