import React from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import HistoryBlock from "../../utils/historyBlock";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import WarningIcon from "@material-ui/icons/Warning";

const Dashboard = ({ users }) => {
  return (
    <DashboardLayout title="Overview">
      <hr />
      <div className="user_nfo_panel">
        <div>
          <span>{users.data.firstname}</span>
          <span>{users.data.lastname}</span>
          <span>{users.data.email}</span>
          {/* <Button
            disabled
            variant="outlined"
            color="secondary"
            startIcon={<PersonIcon />}
          >
            {users.data.firstname} {users.data.lastname}
          </Button>
          <PersonIcon />
          <strong> */}

          {/* </strong> */}

          {/* </div> */}
          {/* <div>
          <Button
            disabled
            variant="outlined"
            color="secondary"
            startIcon={<EmailIcon />}
          >
            {users.data.email}
          </Button> */}
        </div>
        {users.data.history ? (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block">
              <HistoryBlock history={users.data.history} />
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
