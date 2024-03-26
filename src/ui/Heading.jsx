
import { css } from "styled-components";
import styled from "styled-components";

const Heading = styled.h1`
font-size: 5rem;
font-family: inherit;
${(props) =>
    props.as === 'h4' && css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `
  }

`

export default Heading;