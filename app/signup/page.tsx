import React from "react";
import Default from "../templates/Default";
import SignupForm from "../components/Forms/SignupForm";

function Signup() {
  return (
    <>
      <Default>{<SignupForm />}</Default>
    </>
  );
}

export default Signup;
