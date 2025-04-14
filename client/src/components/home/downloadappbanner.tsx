import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DownloadAppBanner = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
              Take One Sky Quest With You
            </h2>
            <p className="mb-6">
              Download our mobile app to access all features offline, get
              real-time alerts, and manage your travel plans on the go.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="bg-black hover:bg-black/80 text-white py-3 px-4 rounded-lg inline-flex items-center transition border-transparent"
              >
                <FontAwesomeIcon
                  icon={["fab", "apple"]}
                  className="text-2xl mr-3"
                />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="bg-black hover:bg-black/80 text-white py-3 px-4 rounded-lg inline-flex items-center transition border-transparent"
              >
                <FontAwesomeIcon
                  icon={["fab", "google-play"]}
                  className="text-2xl mr-3"
                />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              alt="One Sky Quest mobile app"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppBanner;
