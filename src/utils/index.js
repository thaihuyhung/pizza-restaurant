import request from './request';

const getAddressString = (address) => {
  const streetNumber = address.get('streetNumber') || address.get('street_number') || '';
  const streetName = address.get('streetName') || address.get('street_name') || '';
  const zipcode = address.get('zipcode');
  const city = address.get('city');
  return `${streetName} ${streetNumber}, ${zipcode} ${city}`;
}

export default {
  request,
  getAddressString
}