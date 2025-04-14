import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyConverter from "../ui/currency-converter";

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

interface Budget {
  total: number;
  spent: number;
  percentUsed: number;
  categories: ExpenseCategory[];
}

interface SavingTip {
  id: string;
  title: string;
  description: string;
}

const BudgetTrackerSection = () => {
  const { data: budget, isLoading: isBudgetLoading } = useQuery({
    queryKey: ["/api/budget"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        total: 2500,
        spent: 1280,
        percentUsed: 51,
        categories: [
          {
            id: "accommodation",
            name: "Accommodation",
            amount: 680,
            percentage: 27,
            icon: "hotel",
            color: "blue",
          },
          {
            id: "food",
            name: "Food & Dining",
            amount: 320,
            percentage: 13,
            icon: "utensils",
            color: "green",
          },
          {
            id: "activities",
            name: "Activities",
            amount: 210,
            percentage: 8,
            icon: "ticket-alt",
            color: "purple",
          },
        ],
      } as Budget;
    },
  });

  const { data: savingTips, isLoading: isTipsLoading } = useQuery({
    queryKey: ["/api/saving-tips"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [
        {
          id: "tip1",
          title: "Paris Museum Pass",
          description:
            "Save €45 by purchasing the 4-day museum pass instead of individual tickets.",
        },
        {
          id: "tip2",
          title: "Metro Savings",
          description:
            "Buy a carnet of 10 metro tickets to save 27% compared to individual tickets.",
        },
        {
          id: "tip3",
          title: "Dining Strategy",
          description:
            "Lunch prix fixe menus offer better value than dinner at the same restaurants.",
        },
        {
          id: "tip4",
          title: "Free Museum Days",
          description:
            "Many Paris museums offer free admission on the first Sunday of each month.",
        },
      ] as SavingTip[];
    },
  });

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-neutral-800 mb-2">
          Smart Budget Tracker
        </h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Keep track of your expenses, convert currencies on the fly, and get
          personalized cost-saving suggestions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Overview Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden col-span-1">
          <div className="bg-primary text-white p-4">
            <h3 className="font-semibold text-lg">Trip Budget Overview</h3>
            <p className="text-white/80 text-sm">Paris Getaway (June 2023)</p>
          </div>

          <div className="p-4">
            {isBudgetLoading ? (
              <div className="flex justify-center py-20">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-2xl"
                />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-neutral-500">Total Budget</p>
                    <p className="text-2xl font-bold text-neutral-800">
                      ${budget?.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Spent So Far</p>
                    <p className="text-2xl font-bold text-accent">
                      ${budget?.spent}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Budget Used</span>
                    <span className="font-medium">{budget?.percentUsed}%</span>
                  </div>
                  <Progress
                    value={budget?.percentUsed}
                    className="h-2.5 bg-neutral-200"
                  />
                </div>

                <div className="space-y-3 mb-6">
                  {budget?.categories.map((category) => (
                    <div
                      className="flex justify-between items-center p-2 bg-neutral-100 rounded-lg"
                      key={category.id}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full bg-${category.color}-100 flex items-center justify-center text-${category.color}-500`}
                        >
                          <FontAwesomeIcon
                            icon={category.icon}
                            className="text-xs"
                          />
                        </div>
                        <span className="ml-3 text-neutral-800">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-neutral-800">
                          ${category.amount}
                        </span>
                        <p className="text-xs text-neutral-500">
                          {category.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition">
              <FontAwesomeIcon icon="plus-circle" className="mr-2" /> Add
              Expense
            </Button>
          </div>
        </div>

        {/* Currency Converter */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-fit">
          <CurrencyConverter />
        </div>

        {/* Cost-Saving Tips */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-fit">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg text-neutral-800">
                Smart Saving Tips
              </h3>
              <p className="text-neutral-500 text-sm">
                Personalized for your Paris trip
              </p>
            </div>
            <span className="bg-accent/10 text-accent text-xs font-bold py-1 px-2 rounded-full">
              AI Powered
            </span>
          </div>

          <div className="p-4">
            {isTipsLoading ? (
              <div className="flex justify-center py-10">
                <FontAwesomeIcon
                  icon="spinner"
                  spin
                  className="text-primary text-2xl"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {savingTips?.map((tip) => (
                  <div className="flex items-start" key={tip.id}>
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <FontAwesomeIcon icon="lightbulb" className="text-sm" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-neutral-800">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-neutral-500">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
              <span className="text-sm text-neutral-500">
                Potential savings with these tips:
              </span>
              <p className="font-bold text-green-600 text-lg">€120+ (~$130)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetTrackerSection;
