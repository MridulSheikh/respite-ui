import DashboardCardGroup from "./DashboardCardGroup";
import SuppliesPieStaticChirt from "./SuppliesPieStaticChirt";

const Dashboard = () => {
  return (
    <div className="p-5">
      <h1 className="dark:text-gray-200">Dashboard</h1>
      <div className="mt-5">
        <DashboardCardGroup />
        <div className=" flex gap-4 mt-10">
          <SuppliesPieStaticChirt />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
