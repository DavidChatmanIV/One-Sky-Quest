import SearchForm from "../ui/search-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeroSection = () => {
  return (
    <section className="relative bg-primary text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80"
          alt="Travel background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Discover the world with AI-powered travel
          </h1>
          <p className="text-lg mb-8">
            Plan, book, and experience your perfect trip with personalized
            recommendations and smart features.
          </p>

          {/* Search form */}
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
