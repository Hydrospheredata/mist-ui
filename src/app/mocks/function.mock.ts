import { Function } from '@app/modules/shared/models';

export const mockFunction: Function = new Function({
  name: 'simple-context',
  lang: 'scala',
  tags: ['streaming'],
  execute: '{"numbers":{"type":"MList","args":[{"type":"MInt","args":[]}]},"multiplier":{"type":"MOption","args":[{"type":"MInt","args":[]}]}}'
})

export const mockFunctionList: Function[] = [mockFunction];
