
function handleBooking(event) {
  event.preventDefault();
  const form = event.target;
  const name = encodeURIComponent(form.name.value || '');
  const business = encodeURIComponent(form.business.value || '');
  const email = encodeURIComponent(form.email.value || '');
  const phone = encodeURIComponent(form.phone.value || '');
  const message = encodeURIComponent(form.message.value || '');
  const subject = encodeURIComponent('Consultation Request - BizHR');
  const body = encodeURIComponent(
    'Name: ' + decodeURIComponent(name) + '
' +
    'Business: ' + decodeURIComponent(business) + '
' +
    'Email: ' + decodeURIComponent(email) + '
' +
    'Phone: ' + decodeURIComponent(phone) + '

' +
    'Need help with:
' + decodeURIComponent(message) + '

' +
    'I would like to book the $75 30-minute initial consultation.'
  );
  window.location.href = 'mailto:mario_espindola@outlook.com?subject=' + subject + '&body=' + body;
  return false;
}
