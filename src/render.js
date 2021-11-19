import onChange from 'on-change';
import _ from 'lodash';

const findWarnEl = (node) => {
  const parentNode = node.parentNode;
  return parentNode.querySelector('.warning__description');
};

const handlerStatusForm = (status, element) => {
  switch (status) {
    case 'finishing':
      element.form.reset();
      element.form.classList.remove('_sending');
      alert('Спасибо за обращение');
      break;
    case 'processing':
      element.form.classList.add('_sending');
      break;
    case 'failed':
      alert('Network error');
      element.form.classList.remove('_sending');
      break;
    default:
      throw new Error(`Unidentified status: ${status}`);
      break;
  }
};

const handlerFeedbackForm = (errors, elements) => {
  const { inputs } = elements;
  const nodes = Array.from(inputs);
  const validFilds = _.differenceBy(nodes, errors, 'name');
  nodes.forEach((node) => {
    if (validFilds.includes(node)) {
      node.parentNode.classList.remove('_error');
      findWarnEl(node).textContent = '';
    } else {
      node.parentNode.classList.add('_error');
      const { errorMessage } = errors.find((error) => error.name === node.name);
      findWarnEl(node).textContent = errorMessage;
    }
  });
};

export default (state, elements) => {
  const view = onChange(state, (path, value) => {
    switch (path) {
      case 'feedbackForm.errors':
        handlerFeedbackForm(value, elements);
        break;
      case 'feedbackForm.status':
        handlerStatusForm(value, elements);
        break;
      default:
        break;
    }
  });
  return view;
};
