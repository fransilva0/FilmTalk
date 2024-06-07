import { Input, InputPost, InputTitle } from "./style"

export function InputUserForm({placeholder, type, value, onChange}) {
    return (
      <Input placeholder={placeholder} type={type} value={value} onChange={onChange} />
    )
  }

export function InputPublicationTitle({placeholder, type, value, onChange}) {
    return (
        <InputTitle placeholder={placeholder} type={type} value={value} onChange={onChange} />
    )
}

export function InputPublicationPost({placeholder, type, value, onChange}) {
    return (
        <InputPost placeholder={placeholder} type={type} value={value} onChange={onChange} />
    )
}