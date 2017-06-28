import { SearchPipe } from './search.pipe';
import { mockEndpointsList } from '@mocks/endpoint.mock'

describe('SearchPipe', () => {
	let pipe: SearchPipe;
  let items: any[];

  beforeEach(() => {
    pipe = new SearchPipe();
    items = mockEndpointsList;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filter items by name', () => {
    expect(pipe.transform(items, 'name', 'simple')).toEqual(mockEndpointsList)
  })

  it('return items if args undefiened', () => {
    expect(pipe.transform(items, 'name', '')).toEqual(mockEndpointsList)
  })
});
