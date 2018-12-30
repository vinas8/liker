const googleSearch = require('../script.js');

const dbMock = [
  'dog.com',
  'ciau.com',
  'disney.com',
  'dogpictures.com',
  'cat'
];

describe('googleSearch', () => {

  it('Is a silly test', () => {
    expect('hello').toBe('hello')
    // console.log(googleSearch('cat', dbMock)) 
  })
  
  it('Is searching google', () => {
    expect(googleSearch('ca', dbMock)).toEqual(["cat"]);
    expect(googleSearch('caasdf', dbMock)).toEqual([]);
    expect(googleSearch('dog', dbMock)).toEqual(['dog.com', 'dogpictures.com']);
  })
  
  //REPEAT YOURSELF :D
  
  it('Works with undefined and null input', () => {
    expect(googleSearch(undefined, dbMock)).toEqual([]);
    expect(googleSearch(null, dbMock)).toEqual([]);
  })
  
  it('Does not return more than 3 matches', () => {
    expect(googleSearch('.com', dbMock).length).toEqual(3);
  })  
})
