import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon
                icon="paper-plane"
                className="text-accent text-2xl"
              />
              <span className="text-xl font-bold text-white font-poppins">
                One Sky Quest
              </span>
            </Link>
            <p className="text-neutral-400 mb-4">
              Your AI-powered travel companion for smarter, more connected
              journeys around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <FontAwesomeIcon icon={["fab", "pinterest-p"]} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/explore"
                  className="text-neutral-400 hover:text-white transition"
                >
                  All-in-One Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-neutral-400 hover:text-white transition"
                >
                  AI Itinerary Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/my-trips"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Budget Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/my-trips"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Real-Time Alerts
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Offline Mode
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Hidden Gem Finder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Trust & Safety
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-neutral-400 mb-4">
              Get travel tips and exclusive offers delivered to your inbox.
            </p>
            <form className="mb-4">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow p-2 rounded-l-md text-neutral-800 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white p-2 rounded-r-md transition"
                >
                  <FontAwesomeIcon icon="paper-plane" />
                </Button>
              </div>
            </form>
            <p className="text-neutral-500 text-xs">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 text-center text-neutral-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} One Sky Quest. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
