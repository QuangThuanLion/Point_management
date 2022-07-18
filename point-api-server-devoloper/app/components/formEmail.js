exports.content = function (userName, newPass) {
  return `<table
    align="center"
    border="1"
    cellpadding="0"
    cellspacing="0"
    width="600"
  >
    <tr>
      <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0">
        <img
          src="http://192.168.4.25:3000/upload/h1.png"
          width="500"
          height="230"
          style="display: block"
        />
      </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
            Hello ${userName}! <br> <br>
            We heard that you lost your GitHub password. Sorry about that! <br>
            But don’t worry! We will provide you with a new password<br>
            Your new passwork: <strong>${newPass}</strong><br>
            You can sign in, and chage password.<br> <br>
            Thank you!</br>
            The support team.
        </td>
    </tr>
  </table>`;
};
