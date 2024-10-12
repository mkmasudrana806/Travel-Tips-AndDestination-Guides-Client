// onclick event type
export type TOnClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type TSelectOnChange = (value: string) => void;

// Type  for input change event
export type TInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

// Type  for textarea change event
export type TTextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

// Type  for select change event
export type TSelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
