import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Поле не заполнено',
  },
  string: {
    max: 'Слишком длинная строка',
    email: 'Неверный формат почты',
  },
});

const schema = yup.object().shape({
  name: yup.string().trim().max(300).required(),
  email: yup.string().email().max(300).required(),
  phoneNumber: yup.string().max(300).required(),
  dateOfBirth: yup.string().required(),
  question: yup.string().max(3000).required(),
});

export default (name, value) => {
  const schemaPath = yup.reach(schema, name);

  try {
    schemaPath.validateSync(value);
    return null;
  } catch (error) {
    const { message } = error;
    return message;
  }
};
