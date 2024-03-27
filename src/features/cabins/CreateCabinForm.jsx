import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./CreateCabinapi";
import useEditCabin from "./EditCabinapi";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1fr;
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

export function CreateCabinForm({ cabintoedit = {}, onClosemodal }) {
  const { id: editID, ...editvalues } = cabintoedit;

  const isEditingsession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingsession ? editvalues : {}
  })

  const { errors } = formState;



  const { iscreating, creating } = useCreateCabin();

  const { isediting, editing } = useEditCabin()

  const isworking = iscreating || isediting;

  function formsubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditingsession) editing({ newcabin: { ...data, image: image }, id: editID }, {
      onSuccess: reset()
    }, onClosemodal?.())
    else creating({ ...data, image: image }, { onSuccess: reset() }, onClosemodal?.())
  }

  function onerror(err) {
    //console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(formsubmit, onerror)} type={onClosemodal ? 'modal' : 'regular'}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input disabled={isworking} type="text" id="name" {...register("name", { required: "this field is required" })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="max_capacity">Maximum capacity</Label>
        <Input disabled={isworking} type="number" id="max_capacity" {...register("max_capacity", {
          required: "this field is required", min: {
            value: 1,
            message: "Capacity should be atleast 1"
          }
        })} />

        {errors?.max_capacity?.message && <Error>{errors.max_capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regular_price">Regular price</Label>
        <Input disabled={isworking} type="number" id="regular_price" {...register("regular_price", {
          required: "this field is required", min: {
            value: 100,
            message: "the price should be atleast 100"
          }
        })} />
        {errors?.regular_price?.message && <Error>{errors.regular_price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input disabled={isworking} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => value < getValues().regular_price || "Discount should be less than regular price"
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea disabled={isworking} type="text" id="description" defaultValue="" {...register("description", { required: "this field is required" })} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image",)} />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClosemodal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iscreating}>{isEditingsession ? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
