import {ErrorMessageStyled} from "./style"

export function ErrorMessage({children}) {
    return (
      <>
        <ErrorMessageStyled>{children}</ErrorMessageStyled>
      </>
    )
  }