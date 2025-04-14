import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateTripForm from "@/components/trips/CreateTripForm";
import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateTrip() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <FontAwesomeIcon icon="chevron-right" className="text-xs" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/my-trips">My Trips</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <FontAwesomeIcon icon="chevron-right" className="text-xs" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Create Trip</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CreateTripForm />
      </div>
    </div>
  );
}