import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createnewcabin } from "../../services/apicabins";
import toast from "react-hot-toast";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm()

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: iscreating, mutate } = useMutation({
    mutationFn: createnewcabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    }
  })

  function formsubmit(data) {
    mutate({ ...data, image: data.image[0] })
  }

  function onerror(err) {
    //console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(formsubmit, onerror)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input disabled={iscreating} type="text" id="name" {...register("name", { required: "this field is required" })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="max_capacity">Maximum capacity</Label>
        <Input disabled={iscreating} type="number" id="max_capacity" {...register("max_capacity", {
          required: "this field is required", min: {
            value: 1,
            message: "Capacity should be atleast 1"
          }
        })} />

        {errors?.max_capacity?.message && <Error>{errors.max_capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regular_price">Regular price</Label>
        <Input disabled={iscreating} type="number" id="regular_price" {...register("regular_price", {
          required: "this field is required", min: {
            value: 100,
            message: "the price should be atleast 100"
          }
        })} />
        {errors?.regular_price?.message && <Error>{errors.regular_price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input disabled={iscreating} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => getValues().regular_price > value || "Discount should be less than regular price"
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea disabled={iscreating} type="text" id="description" defaultValue="" {...register("description", { required: "this field is required" })} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image", { required: "this field is required" })} />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iscreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
