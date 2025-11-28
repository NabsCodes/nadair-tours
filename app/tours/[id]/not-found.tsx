import { NotFound } from "@/components/ui/not-found";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function TourNotFound() {
  return (
    <NotFound
      title="Tour Not Found"
      subtitle="We couldn't find the adventure you're looking for"
      description="The tour you're looking for doesn't exist or has been removed. But don't worry—there are plenty of other amazing Scottish adventures waiting for you!"
      icon={FaMapMarkedAlt}
      iconColor="primary"
    />
  );
}
