interface ITemplateVariables {
  // { name(always string): 'Pedro'(string), idade(always string): 24(number) ...}
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}