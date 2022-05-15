import { getSession } from 'next-auth/client';
import RouteGuard from 'utils/guards/RouteGuard';

const Dashboard = () => {
   return (
      <RouteGuard>
         <h1>Dashboard</h1>
      </RouteGuard>
   );
};

export default Dashboard;
