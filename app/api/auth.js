import client from "./client";

const loginMobile = async (country, mobile, textMobile, otp) => {
  const responce = await client.post("/vender-otp-login", {
    country_id: country.id,
    mobile_no: mobile,
    otp: otp,
  });
  return responce;
  //console.log(responce);
};

const otpRequest = async (countryCode, mobileNo) => {
  const responce = await client.post("/vender-otp-request", {
    country_id: countryCode.id,
    mobile_no: mobileNo,
  });
  return responce;
  //console.log(responce.data);
};

//const profile = () => client.post("/profile", {});

export default {
  loginMobile: loginMobile,
  otpRequest: otpRequest,
  //profile:profile
};
