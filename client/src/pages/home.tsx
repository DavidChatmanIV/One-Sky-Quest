import HeroSection from "@/components/home/HeroSection";
import BookingSection from "@/components/home/BookingSection";
import AIItinerarySection from "@/components/home/AIItinerarySection";
import BudgetTrackerSection from "@/components/home/BudgetTrackerSection";
import RealTimeAlertsSection from "@/components/home/RealTimeAlertsSection";
import HiddenGemSection from "@/components/home/HiddenGemSection";
import CommunitySection from "@/components/home/CommunitySection";
import DownloadAppBanner from "@/components/home/DownloadAppBanner";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BookingSection />
      <AIItinerarySection />
      <BudgetTrackerSection />
      <RealTimeAlertsSection />
      <HiddenGemSection />
      <CommunitySection />
      <DownloadAppBanner />
    </>
  );
};

export default Home;
