import { SearchPipe } from '@app/modules/shared/pipes/search.pipe';
import { mockFunctionList } from '@app/mocks/function.mock'

describe('SearchPipe', () => {
	let pipe: SearchPipe;
  let items: any[];

  beforeEach(() => {
    pipe = new SearchPipe();
    items = mockFunctionList;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filter items by name', () => {
    expect(pipe.transform(items, 'name', 'simple')).toEqual(mockFunctionList)
  });

  it('return items if args undefiened', () => {
    expect(pipe.transform(items, 'name', '')).toEqual(mockFunctionList)
  })
});
