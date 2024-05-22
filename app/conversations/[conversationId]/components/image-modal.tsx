import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
}
export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
}) => {
  if (!src) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg border-none">
        <div className="w-60 h-60 sm:w-80 sm:h-80">
          <Image className="object-cover" fill alt="Image" src={src} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
