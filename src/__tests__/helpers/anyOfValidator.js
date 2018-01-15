import { validation as Validation } from 'folktale';
import { anyOfValidator } from '../../index';
import { andErrorMessages } from '../../messages';
import {
  spy,
  stubReturnsSuccess,
  stubReturnsFailure,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`anyOfValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with first validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const v1 = stubReturnsSuccess(value);
        const v2 = spy();
        const v3 = spy();
        const validator = anyOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.notCalled).toBeTruthy();
        expect(v3.notCalled).toBeTruthy();
      });
    });
    describe(`with second validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = 1;
        const errorMessage = `message`;
        const v1 = stubReturnsFailure(errorMessage);
        const v2 = stubReturnsSuccess(value);
        const v3 = spy();
        const validator = anyOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.notCalled).toBeTruthy();
      });
    });
    describe(`with third validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = 1;
        const errorMessage = `message`;
        const v1 = stubReturnsFailure(errorMessage);
        const v2 = stubReturnsFailure(errorMessage);
        const v3 = stubReturnsSuccess(value);
        const validator = anyOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });
  });
  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure`, () => {
      const value = `x`;
      const errorMessage1 = `message1`;
      const errorMessage2 = `message2`;
      const v1 = stubReturnsFailure(errorMessage1);
      const v2 = stubReturnsFailure(errorMessage2);
      const validator = anyOfValidator([v1, v2]);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([andErrorMessages([errorMessage1, errorMessage2])])
      );
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v2.calledWith(value)).toBeTruthy();
    });
  });
});
