import { FC, RefObject, useCallback, useEffect } from "react";

import { Form as AntdForm } from "antd";
import {
  FormProps as AntdFormProps,
  FormInstance,
  FormItemProps,
} from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import _ from "lodash";
import _isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";

export type FormValues = any;

export type FormErrors = Record<string, string | string[]> | undefined;

export interface FormProps extends AntdFormProps {
  values?: FormValues;
  formRef?: RefObject<FormInstance>;
}

const Form = ({
  values = undefined,
  children,
  formRef = undefined,
  form,
  ...props
}: FormProps) => {
  const [formInstance] = useForm(form);

  const bindValues = useCallback(() => {
    formInstance.resetFields();
  }, [formInstance]);

  const prevValues = usePrevious(values);

  useEffect(() => {
    if (!_isEqual(prevValues, values)) {
      bindValues();
    }
  }, [bindValues, values, prevValues]);

  const debounceValidateForm = _.debounce(() => {
    formInstance.validateFields();
  }, 50);

  const handleValuesChange = (changedValues: FormValues, val: FormValues) => {
    debounceValidateForm();
    props.onValuesChange?.(changedValues, val);
  };

  return (
    <AntdForm
      layout="vertical"
      form={formInstance}
      name="control-hooks"
      ref={formRef}
      initialValues={values}
      onValuesChange={handleValuesChange}
      {...props}
    >
      {children}
    </AntdForm>
  );
};

interface ItemProps extends FormItemProps {
  form?: FormInstance;
  neverShowErrorMessage?: boolean;
}

export const Item: FC<ItemProps> = ({
  form,
  className,
  neverShowErrorMessage = false,
  children,
  ...props
}) => {
  const [formInstance] = useForm(form);

  if (neverShowErrorMessage) {
    return (
      <AntdForm.Item {...props} help="" validateStatus="" noStyle>
        {children}
      </AntdForm.Item>
    );
  }

  return (
    <AntdForm.Item shouldUpdate noStyle>
      {() => {
        const isTouched = formInstance?.isFieldTouched(props.name || "");
        const fieldError = formInstance?.getFieldError(props.name || "");
        const shouldShowError = isTouched && !!fieldError?.length;
        return (
          <AntdForm.Item
            className={className}
            validateStatus={shouldShowError ? "error" : ""}
            help={shouldShowError ? fieldError : ""}
            {...props}
          >
            {children}
          </AntdForm.Item>
        );
      }}
    </AntdForm.Item>
  );
};

export const { List } = AntdForm;

export default Form;

export { useForm };
