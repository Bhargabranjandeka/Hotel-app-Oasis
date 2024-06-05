import Form from "../../ui/Form";
import Input from "../../ui/Input";
import styled from "styled-components";
import useSettings from "./Settingsapi";
import Spinner from "../../ui/Spinner";
import useUpdateCabin from "./Updatesetting";
import Uploader from "../../data/Uploader";
const FormRowsettings = styled.div`
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

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookinglength,
      maxBookinglength,
      maxguestperbooking,
      Breakfastprice,
    } = {},
  } = useSettings();

  const { isUpdating, Settingupdate } = useUpdateCabin();

  function handleupdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    Settingupdate({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRowsettings>
        <Label htmlFor="min-nights">Min-nights</Label>
        <Input
          onBlur={(e) => handleupdate(e, "minBookinglength")}
          type="number"
          id="min-nights"
          defaultValue={minBookinglength}
          disabled={isUpdating}
        />
      </FormRowsettings>
      <FormRowsettings>
        <Label htmlFor="max-nights">Max-nights</Label>
        <Input
          onBlur={(e) => handleupdate(e, "maxBookinglength")}
          type="number"
          id="max-nights"
          defaultValue={maxBookinglength}
          disabled={isUpdating}
        />
      </FormRowsettings>
      <FormRowsettings>
        <Label htmlFor="max-guests">Max-guests</Label>
        <Input
          onBlur={(e) => handleupdate(e, "maxguestperbooking")}
          type="number"
          id="max-guests"
          defaultValue={maxguestperbooking}
          disabled={isUpdating}
        />
      </FormRowsettings>
      <FormRowsettings>
        <Label htmlFor="breakfast-price">breakfast-price</Label>
        <Input
          onBlur={(e) => handleupdate(e, "Breakfastprice")}
          type="number"
          id="breakfast-price"
          defaultValue={Breakfastprice}
          disabled={isUpdating}
        />
      </FormRowsettings>
    </Form>
  );
}

export default UpdateSettingsForm;
