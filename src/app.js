import validate from './validator.js';
import render from './render.js';
import sendFormData from './fetch';
import IMask from 'imask';

const elements = {
  form: document.querySelector('form'),
  inputs: document.querySelectorAll('.feedback-list__input'),
  inputPhoneNum: document.querySelector('[name="phoneNumber"]'),
};

export default () => {
  const state = {
    feedbackForm: {
      status: 'filling',
      data: {
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        question: '',
      },
      errors: [],
    },
  };

  const view = render(state, elements);

  const maskOption = {
    mask: '+7(000)000-00-00',
    lazy: false,
  };

  new IMask(elements.inputPhoneNum, maskOption);

  const verifyField = (name, value) => {
    const errorMessage = validate(name, value);
    view.feedbackForm.errors = view.feedbackForm.errors.filter(
      (error) => error.name !== name
    );

    if (errorMessage) {
      const error = { name, errorMessage };
      view.feedbackForm.errors.push(error);
    }
    view.feedbackForm.data[name] = value;
  };

  const inputListener = (event) => {
    const { name, value } = event.target;
    verifyField(name, value);
  };

  const submitListener = async (event) => {
    event.preventDefault();
    const availableData = Object.entries(state.feedbackForm.data);
    availableData.forEach(([name, value]) => {
      if (value === '') verifyField(name, value);
    });

    if (state.feedbackForm.errors.length !== 0) {
      return;
    }

    view.feedbackForm.status = 'processing';
    const formData = new FormData(event.target);
    await sendFormData(formData)
      .then(() => {
        view.feedbackForm.status = 'finishing';
      })
      .catch(() => {
        view.feedbackForm.status = 'failed';
      });
  };

  const { inputs, form } = elements;

  inputs.forEach((input) => {
    input.addEventListener('change', inputListener);
  });

  form.addEventListener('submit', submitListener);
};
