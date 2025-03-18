import { FunctionComponent } from "react";

import AdminCardsStat from "./AdminCardsStat";
import AdimnUsersStat from "./AdimnUsersStat";

interface AdminStatsProps {}

const AdminStats: FunctionComponent<AdminStatsProps> = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <AdminCardsStat />
        </div>
        <div className="row">
          <AdimnUsersStat />
        </div>
      </div>
    </>
  );
}; 

export default AdminStats;
