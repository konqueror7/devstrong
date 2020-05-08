const mailForm = document.mail_form;
const searchForm = document.search_form;

const createRequest = async (options = {}) => {
  let {
    url,
    data,
    callback
  } = options;

  try {
    let response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      let json_response = await response.json();
      callback.call(this, null, json_response);
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  } catch (e) {
    console.log(e);
    callback.call(this, e, null);
  }

}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchFormData = new FormData(searchForm);
  localStorage.setItem('search', searchFormData.get('search'));
  alert('Мы запомнили Ваш выбор!');
});

mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const mailFormData = new FormData(mailForm);
  mailFormData.append('search', localStorage.getItem('search'));
  createRequest({
    url: 'http://devstrong.localhost/php/send.php',
    data: mailFormData,
    callback: (err, response) => {
      if (response && response.success === true) {
        alert('Ваше письмо успешно отправлено!');
        localStorage.clear();
        console.log(response.search + ' from callback');
      } else {
        console.log(err);
        alert('Попробуйте отправить письмо еще раз!');

      }
    }
  });
  mailForm.reset();
});
