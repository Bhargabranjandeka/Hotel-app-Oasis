import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryclient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({

    mutationFn: (bookingId) => updateBooking(bookingId, {
      status: 'checked-out',
    }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} is successfully checked-out`);
      queryclient.invalidateQueries({ active: true });
      navigate('/')
    },

    onError: () => toast.error(`There was an error checking-out`)
  })

  return { checkout, isCheckingout }
}