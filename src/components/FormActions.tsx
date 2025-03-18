import { FunctionComponent } from "react";



interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const FormActions: FunctionComponent<FormActionsProps> = ({
  onSubmit,
  onCancel,
}) => {
    
  return (
    <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
      <div className="mx-3 mt-4 col-6">
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
      <div className="mx-3 mt-4 col-6">
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormActions;
