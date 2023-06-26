export interface IFormErrors {
  hasError: boolean;
  message?: string;
  regex?: RegExp | ((value: string) => boolean);
}

export interface IFormSchema {
  name: string;
  errorsList: Array<IFormErrors>;
}
