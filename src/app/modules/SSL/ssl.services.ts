import axios from "axios";
import config from "../../../config";

const initPayment = async (paymentData: any) => {
  const data = {
    store_id: config.ssl.store_id,
    store_passwd: config.ssl.store_pass,
    total_amount: paymentData.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: "https://api.paypal.com",
    fail_url: "https://api.paypal.com",
    cancel_url: config.ssl.cancelled_url,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Online",
    product_name: "Computer.",
    product_category: "Services",
    product_profile: "general",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: "N/A",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const response = await axios({
    method: "post",
    url: config.ssl.payment_api,
    data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

export const sslServices = {
  initPayment,
};
