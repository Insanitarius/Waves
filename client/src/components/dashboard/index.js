import React from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import HistoryBlock from "../../utils/historyBlock";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import WarningIcon from "@material-ui/icons/Warning";
import { useDispatch } from "react-redux";
import { resendVerification } from "../../store/actions/user.actions";

const Dashboard = ({ users }) => {
  const dispatch = useDispatch();
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
                  onClick={() => {
                    dispatch(resendVerification());
                  }}
                >
                  Verify Email
                </Button>
              </span>
            )}
          </div>
        </div>
        <hr style={{ height: "1px" }} />
        {users.data.history ? (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            {users.data.history.length > 0 ? (
              <div
                className="user_product_block"
                style={{ display: "flow-root" }}
              >
                <HistoryBlock history={users.data.history} />
              </div>
            ) : (
              <div
                className="user_product_block"
                style={{ justifyContent: "center" }}
              >
                <h5 style={{ color: "rgb(104, 104, 104)", fontSize: "18px" }}>
                  You have not made any purchases.
                </h5>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
