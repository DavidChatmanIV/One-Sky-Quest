import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Booking option type
interface BookingOption {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  icon: IconProp;
  linkText: string;
}

// Booking options data
const bookingOptions: BookingOption[] = [
  {
    id: "flights",
    title: "Flights",
    description: "Find the best flight deals across multiple airlines",
    imageSrc:
      "https://images.unsplash.com/photo-1507812984078-917a274065be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "plane",
    linkText: "Search flights",
  },
  {
    id: "hotels",
    title: "Hotels",
    description: "Book accommodations that fit your style and budget",
    imageSrc:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "hotel",
    linkText: "Find hotels",
  },
  {
    id: "resorts",
    title: "Resorts",
    description: "Experience luxury all-inclusive resorts worldwide",
    imageSrc:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "umbrella-beach",
    linkText: "Browse resorts",
  },
  {
    id: "cruises",
    title: "Cruises",
    description: "Explore luxury cruise lines and ocean adventures",
    imageSrc:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "ship",
    linkText: "Find cruises",
  },
  {
    id: "cars",
    title: "Car Rentals",
    description: "Rent vehicles from trusted providers worldwide",
    imageSrc:
      "https://images.unsplash.com/photo-1526147462235-8bbe7a6e83fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "car",
    linkText: "Compare cars",
  },
  {
    id: "activities",
    title: "Activities",
    description: "Discover tours, experiences, and local attractions",
    imageSrc:
      "https://images.unsplash.com/photo-1541423894855-83ea0322791e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    icon: "ticket-alt",
    linkText: "Explore activities",
  },
];

const BookingSection = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-neutral-800">
          All-in-One Booking
        </h2>
        <p className="text-neutral-500">
          Find and book everything you need for your journey in one place
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {bookingOptions.map((option) => (
          <Card
            key={option.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={option.imageSrc}
                alt={option.title}
                className="w-full h-full object-cover transition hover:scale-105 duration-700"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FontAwesomeIcon icon={option.icon} />
                </div>
                <h3 className="font-semibold ml-3 text-neutral-800">
                  {option.title}
                </h3>
              </div>
              <p className="text-neutral-500 text-sm mb-4">
                {option.description}
              </p>
              <a
                href="#"
                className="text-primary font-medium flex items-center text-sm hover:text-accent transition"
              >
                {option.linkText}{" "}
                <FontAwesomeIcon icon="arrow-right" className="ml-2" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BookingSection;
