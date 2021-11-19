import axios from 'axios';

const url = 'http://89.223.70.242/sendmail.php';

export default (formData) => axios.post(url, formData);
