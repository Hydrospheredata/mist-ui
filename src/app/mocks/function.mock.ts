import { FunctionInfo } from '@models/function';

export const mockFunction: FunctionInfo = new FunctionInfo({
  name: 'simple-context',
  lang: 'scala',
  tags: ['streaming'],
  execute: '{"numbers":{"type":"MList","args":[{"type":"MInt","args":[]}]},"multiplier":{"type":"MOption","args":[{"type":"MInt","args":[]}]}}'
})

export const mockFunctionList: FunctionInfo[] = [ mockFunction ];
