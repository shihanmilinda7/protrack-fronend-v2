"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button } from "@nextui-org/react";
import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import NextSelectInputField from "../common-comp/nextui-input-fields/next-select-input-fields";
import { handleSelectChangeEvent } from "../utils";
import { MdOutlineEditNote } from "react-icons/md";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";
import CountrySelector from "../country-selector/selector";
import { COUNTRIES } from "../country-selector/countries";
import { FaHourglassStart } from "react-icons/fa";
import NextAreaTextInputField from "../common-comp/nextui-input-fields/next-textarea-input-fields";
import NextEmailInputField, {
  validateEmail,
  validateGmailAddress,
} from "../common-comp/nextui-input-fields/next-email-input-fields";
import { AiOutlineCloseCircle } from "react-icons/ai";

const NewOrganization = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [isCountryListOpen, setIsCountryListOpen] = useState(false);

  const [name, setName] = useState("");
  const [organizationname, setOrganizationname] = useState("");
  const [country, setCountry] = useState<any["value"]>("LK");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [adminusername, setAdminusername] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const customStyles = {
    overlay: {
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
  };

  const submitHandler = async () => {
    const isValid = validateGmailAddress(email);
    console.log("isValid", isValid);
    if (isValid) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    toast.info("Coming soon!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div>
      <Button
        color="primary"
        endContent={<FaHourglassStart className="h-4 w-4" />}
        onClick={() => setIsOpen(true)}
      >
        <span className="m-2">
          Get started with <br /> create organization
        </span>
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pb-1 w-full flex items-center justify-between">
          <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 pl-2 mr-auto">
            <span className="text-indigo-600">New organization</span>
          </span>
          <AiOutlineCloseCircle
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
          />
        </div>
        <div className="flex items-center justify-center p-6">
          <div className="mx-auto w-full max-w-[750px] min-w-[550px] flex gap-2 flex-col  max-h-[750px] min-h-[450px]">
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextAutoFocusTextInputField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextTextInputField
                  label="Organization name"
                  value={organizationname}
                  onChange={(e) => setOrganizationname(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <CountrySelector
                  id={"country-selector"}
                  open={isCountryListOpen}
                  onToggle={() => setIsCountryListOpen(!isCountryListOpen)}
                  onChange={setCountry}
                  selectedValue={COUNTRIES.find(
                    (option) => option.value === country
                  )}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextAreaTextInputField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full pl-1 pr-1">
                <span className="font-semibold">
                  Please provide a valid email address, I would greatly
                  appreciate it. The confirmation will be sent to the email
                  address you provide.
                </span>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextEmailInputField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {isValidEmail === false && (
                <div className="w-full pl-1 pr-1">
                  <span className="font-semibold text-red-600">
                    Invalid email address please provide valid gmail
                  </span>
                </div>
              )}
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextTextInputField
                  label="Contact no"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextTextInputField
                  label="Set username for organization admin"
                  value={adminusername}
                  onChange={(e) => setAdminusername(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full pl-1 pr-1">
                <span className="font-semibold">
                  Your admin password will be sent to the email you provided
                  after confirmation.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="">
                <Button
                  color="danger"
                  variant="faded"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
              <div>
                <Button color="primary" onClick={submitHandler}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NewOrganization;
