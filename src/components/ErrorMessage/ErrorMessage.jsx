import s from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={s.error}>
      <p>{message || "Щось пішло не так. Спробуйте пізніше."}</p>
    </div>
  );
};

export default ErrorMessage;