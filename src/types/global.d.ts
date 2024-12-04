type ANY = any;
type BadgeStatus = "positive" | "negative" | "neutral" | "perma" | "caution";

interface IChildren {
  children: React.ReactNode;
}

interface IClass {
  className?: string;
}

type SN = string | number;

interface IModalPropsType {
  userId?: string | boolean | null;
  isOpen: boolean;
  closeModal: () => void;
  // onCategoryCreated: () => void;
}
type StatusText =
  | "successful"
  | "pending"
  | "failed"
  | "neutral"
  | "rejected"
  | "processing"
  | "cancelled"
  | "confirmed";
