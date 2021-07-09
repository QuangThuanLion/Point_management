import Swal from "sweetalert2";

/**--------------------------START USER---------------------- */
export const AlertUpdateSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Update User Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertCreateSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Create User Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertDeleteSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Delete User Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertDeleteFailed= () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Delete User Failed !",
    showConfirmButton: false,
    timer: 1500,
  });
};
/**--------------------------END USER----------------------- */

/**--------------------------START PRODUCT------------------ */
export const AlertUpdateProductSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Update Product Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertCreateProductSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Create Product Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertDeleteProductSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Delete Product Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertDeleteProductFailed= () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Delete Product Failed !",
    showConfirmButton: false,
    timer: 1500,
  });
};
/**--------------------------END PRODUCT----------------------- */

/**--------------------------START CHECK ACCOUNT--------------- */
export const showEmailAlreadyExists = () => {
  Swal.fire({
    icon: "warning",
    text: "Email already exists !",
  });
}

export const showConfirmIsNotCorrectPassword = () => {
  Swal.fire({
    icon: "warning",
    text: "Confirm Password Is Not Correct !",
  });
}

export const showInvalidPassword = () => {
  Swal.fire({
    icon: "warning",
    text: "Old Password Is Not Correct !",
  });
}

export const changePasswordSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Change Password Success !",
    showConfirmButton: false,
    timer: 1500,
  });
}
/**-------------------------END CHECK ACCOUNT ----------------- */


/**--------------------------START POINT--------------- */
export const changeProductToPointSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Change Product To Point Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};
/**-------------------------END POINT ----------------- */

/**-----------------------START NOTIFICATIONS---------- */
export const AlertSendNotificationSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Send Notification Success !",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const AlertSendNotificationFailed= () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Send Notification Failed !",
    showConfirmButton: false,
    timer: 1500,
  });
};
/**-----------------------END NOTIFICATIONS ------------*/

/**-------------------------START LOGGING------------- */
export const AlertShowInvalidUserName = (response) => {
  Swal.fire({
    icon: "warning",
    text: response,
  });
};
/**------------------------END LOGGING--------------- */