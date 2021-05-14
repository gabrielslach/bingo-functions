const someFunc1 = (someInput) => {
  return !someInput;
};

const someFunc2 = (someInput) => {
  return someInput;
};

const someFunc3 = (someInput, callback) => {
  return callback(someInput);
};

const someInnerFunc = (someInput) => {
  return String(someInput);
};

const someApi = (req) => {
  const {value} = req;
  const res1 = someFunc1(value);
  const res2 = someFunc2(res1);
  const res3 = someFunc3(res2, someInnerFunc);

  return res3;
};

/**
 * Test
 */

describe('someApi endpoint', () => {
    test('someFunc1', () => {
      expect(someFunc1(true)).toBe(false);
      expect(someFunc1(false)).toBe(true);
    })

    test('someFunc2', ()=> {
      expect(someFunc2(true)).toBeTruthy();
      expect(someFunc2(false)).toBeFalsy();
    })
    
    test('someInnerFunc', () => {
      expect(someInnerFunc(true)).toStrictEqual('true');
      expect(someInnerFunc(false)).toStrictEqual('false');
    })

    test('someFunc3', () => {
      expect(someFunc3(true, someInnerFunc)).toStrictEqual('true');
      expect(someFunc3(false, someInnerFunc)).toStrictEqual('false');
    })
      
    test('someApi return the inverse of the input as string', () => {
      expect(someApi({value: true})).toBe('false');
      expect(someApi({value: false})).toBe('true');
    })
  })