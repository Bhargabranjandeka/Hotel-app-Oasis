import { useEffect, useRef } from "react";

export default function useOutsideclick(handler, listener = true) {

  const ref = useRef()
  useEffect(
    function () {

      function handleclick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler()
        }
      }

      document.addEventListener('click', handleclick, listener)

      return () => document.removeEventListener('click', handleclick)
    }, [handler, listener]


  )

  return ref
}