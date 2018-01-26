import renderMessage from '../../../errors/renderers/objectRenderer';
import {
  flatErrorMessage,
  nestedObjectErrorMessage,
  nestedArrayErrorMessage,
} from '../../testHelpers/fixtures';

describe(`objectRenderer()`, () => {
  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderMessage(flatErrorMessage);
      expect(result).toEqualWithCompressedWhitespace(
        `Object included invalid value(s)
          – Key 'a': errorMessageForA
          – Key 'b': errorMessageForB
          – Key 'c': errorMessageForC`
      );
    });
  });

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderMessage(nestedObjectErrorMessage);
      expect(result).toEqualWithCompressedWhitespace(
        `Object included invalid value(s)
          – Key 'a': errorMessageForA
          – Key 'b': Object included invalid value(s)
            – Key 'ba': errorMessageForBA
          – Key 'c': errorMessageForC`
      );
    });
  });

  describe(`with a nested array of error objects`, () => {
    it(`renders the correct error message`, () => {
      const result = renderMessage(nestedArrayErrorMessage);
      expect(result).toEqualWithCompressedWhitespace(
        `Object included invalid value(s)
          – Key 'a': errorMessageForA
          – Key 'b': Array included invalid object(s)
            – [0] Object included invalid value(s)
              – Key 'b1a': errorMessageForB1A
              – Key 'b1b': errorMessageForB1A
            – [1] Object included invalid value(s)
              – Key 'b2a': errorMessageForB2B
          – Key 'c': errorMessageForC`
      );
    });
  });
});