import { validation as Validation } from 'folktale';
import chain from '../../utils/chain';
import {
  spy,
  stubReturnsFailure,
  stubReturnsSuccess,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`chain()`, () => {
  describe(`when acc is a Validation.Failure`, () => {
    it(`returns an equal Validation.Faliure`, () => {
      const message = `message`;
      const acc = Failure(message);
      const validator = spy();
      const result = chain(acc, validator);
      expect(result).toEqual(Failure(message));
      expect(result.equals(acc)).toBeTruthy();
      expect(validator.notCalled).toBeTruthy();
    });
  });

  describe(`when acc is a Validation.Success`, () => {
    describe(`when validator succeeds`, () => {
      it(`returns a Validation.Success`, () => {
        const message = `message`;
        const value = `x`;
        const acc = Success(value);
        const validator = stubReturnsFailure(message);
        const result = chain(acc, validator);
        expect(result).toEqual(Failure([message]));
        expect(validator.calledWith(value)).toBeTruthy();
      });
    });

    describe(`when validator fails`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = `x`;
        const acc = Success(value);
        const validator = stubReturnsSuccess(value);
        const result = chain(acc, validator);
        expect(result).toEqual(Success(value));
        expect(validator.calledWith(value)).toBeTruthy();
      });
    });
  });
});
