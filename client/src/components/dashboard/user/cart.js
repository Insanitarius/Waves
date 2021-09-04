import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../hoc/dashboardLayout";
import Loader from "../../../utils/loader";
import { useSelector, useDispatch } from "react-redux";
import CartDetail from "./cartDetail";
import {
  removeFromCart,
  userPaymentSuccess,
} from "../../../store/actions/user.actions";

import { PayPalButton } from "react-paypal-button-v2";
import { paypalClient } from "../../../utils/tools";

const UserCart = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const removeItem = (model) => {
    dispatch(removeFromCart(model));
  };

  const calculateTotal = () => {
    let total = 0;
    props.users.data.cart.forEach((item) => {
      total += parseInt(item.price);
    });
    return total;
  };

  const generateUnits = () => [
    {
      description: "Guitars and accessories",
      amount: {
        currency_code: "USD",
        value: calculateTotal(),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: calculateTotal(),
          },
        },
      },
      items: generateItems(),
    },
  ];

  const generateItems = () => {
    let items = props.users.data.cart.map((item) => ({
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
    return items;
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      if (notifications.msg === "Payment Successful!")
        props.history.push("/dashboard");
    }
    if (notifications && notifications.success) {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <DashboardLayout title="Shopping Cart">
      {props.users.data.cart && props.users.data.cart.length > 0 ? (
        <>
          <hr />
          <CartDetail
            products={props.users.data.cart}
            removeItem={(model) => removeItem(model)}
          />
          <div className="user_cart_sum">
            <div>
              Total amount={" "}
              <span style={{ color: "#B12704" }}>${calculateTotal()}</span>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="pp_button">
              <PayPalButton
                options={{
                  clientId: `${paypalClient}`,
                  currency: "USD",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: generateUnits(),
                  });
                }}
                onSuccess={(details, data) => {
                  dispatch(userPaymentSuccess(details.id));
                  setLoading(true);
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <hr />
          <h4 style={{ color: "#686868" }}>Your Waves Cart is empty.</h4>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserCart;
