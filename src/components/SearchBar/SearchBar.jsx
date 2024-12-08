import toast, { Toaster } from "react-hot-toast";
import { Field, Formik, Form } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const trimmedQuery = values.query.trim();

    if (trimmedQuery === "") {
      toast.error("Будь ласка, введіть пошуковий запит!");
      return;
    }

    onSubmit(trimmedQuery);
    resetForm();
  };

  return (
    <header className={s.search}>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень і фотографій"
            className={s.input}
          />
          <button type="submit" className={s.button}>Знайти</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;