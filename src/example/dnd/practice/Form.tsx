import { useFormData } from '../../../store/formData/formDataStore';
import { isEqual } from 'lodash';
import Section from './Section';

function Form() {
  const data = useFormData(
    (state) => state.form,
    (prevState, nextState) => isEqual(prevState, nextState)
  );
  return (
    <div>
      {data.sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          type={section.type}
          rows={section.rows}
          title={section.title}
        />
      ))}
    </div>
  );
}

export default Form;
