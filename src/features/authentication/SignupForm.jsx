import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState
  const { signingup, isLoading } = useSignup()

  function onsubmit({ fullName, email, password }) {
    signingup({ fullName, email, password }, { onSettled: reset })
  }

  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <FormRow label="Full name" error={errors?.Fullname?.message}>
        <Input type="text" id="fullName" {...register("fullName", { required: "this field is required" })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.Email?.message}>
        <Input type="email" id="email" {...register("email", {
          required: "this field is required", pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please Provide a valid email address"
          }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register("password", {
          required: "this field is required",
          minLength: {
            value: 8,
            message: "Password needs a minimum of 8 length"
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register("passwordConfirm", {
          required: "this field is required",
          validate: (value) => value === getValues().password || "Passwords needs to match"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
