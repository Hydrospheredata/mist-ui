import { Endpoint } from '@models/endpoint';

export const mockEndpoint: Endpoint = {
  name: 'simple-context',
  lang: 'scala',
  tags: ['streaming'],
  execute: '{"numbers":{"type":"MList","args":[{"type":"MInt","args":[]}]},"multiplier":{"type":"MOption","args":[{"type":"MInt","args":[]}]}}'
}

export const mockEndpointsList: Endpoint[] = [ mockEndpoint ];
