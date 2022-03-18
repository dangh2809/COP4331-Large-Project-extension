import React, { useState } from "react";
import Modal from "../components/Modal";

function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);
  function makeInputDiv(label, id, className, type) {
    return (
      <div className={className}>
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        <input className="form-control" type={type} id={id} />
      </div>
    );
  }
  function makeActionButton(type, className, event, text, id = "") {
    return (
      <button type={type} className={className} onClick={event} id={id}>
        {text}
      </button>
    );
  }
  function makeLinkDiv(className, href, content) {
    return (
      <div className={className}>
        <a className="text-danger" href={href}>
          {content}
        </a>
      </div>
    );
  }
  const sendResetLink = async (event) => {
    setIsOpen(true);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body rounded-1">
          <h2 className="text-center">Forgot Password</h2>

          <br></br>
          <div className="text-center">
            <div className="d-flex align-item-center justify-content-center">
              {makeInputDiv(
                "Please enter your email",
                "resetPassword",
                "w-50",
                "email"
              )}
            </div>

            <div className="pt-3">
              {makeActionButton(
                "button",
                "btn btn-success btn-lg",
                () => sendResetLink(),
                "Confirm",
                "resetPasswordButton"
              )}
            </div>

            <div id="formFooter">{makeLinkDiv("pt-2 pl-1", "/", "Cancel")}</div>
          </div>
        </div>
      </div>
      <main>
        {isOpen && <Modal setIsOpen={setIsOpen} purpose="reset password" />}
      </main>
    </div>
  );
}

export default ForgotPassword;
