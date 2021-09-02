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
          <div>
            <PersonIcon
              style={{
                marginBottom: "8px",
                marginLeft: "2px",
                fontSize: "30px",
              }}
            />
            <span
              style={{
                marginRight: "5px",
                marginLeft: "8px",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              {users.data.firstname}
            </span>
            <span style={{ fontSize: "20px", fontWeight: "400" }}>
              {users.data.lastname}
            </span>
          </div>
          <div>
            <EmailIcon
              style={{
                marginBottom: "8px",
                marginLeft: "2px",
                fontSize: "30px",
              }}
            />
            <span
              style={{
                marginRight: "5px",
                marginLeft: "8px",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              {users.data.email}
            </span>
            {users && users.data.verified ? null : (
              <span>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<WarningIcon />}
                  style={{
                    maxHeight: "30px",
                    fontSize: "20px",
                    marginLeft: "50px",
                    marginBottom: "5px",
                  }}
                >
                  Verify Email
                </Button>
              </span>
            )}
          </div>
        </div>
        <hr style={{height: "1px"}} />
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
