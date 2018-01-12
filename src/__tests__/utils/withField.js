import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import { fieldErrorMessage } from '../../messages';
import { withField } from '../../index';

const { Success, Failure } = Validation;

describe(`withField()`, () => {
  describe(`for failed validations`, () => {
    it(`adds the field info before the message`, () => {
      const value = true;
      const message = `message`;
      const field = `field`;
      const v1 = sinon.stub().returns(Failure(message));
      const validator = withField(field, v1);
      const validation = validator(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(fieldErrorMessage(field, message));
      expect(v1.calledWith(value)).toBeTruthy();
    });
  });

  describe(`for succeeded validations`, () => {
    it(`leaves the validation untouched`, () => {
      const value = true;
      const field = `field`;
      const v1 = sinon.stub().returns(Success(value));
      const validator = withField(field, v1);
      const validation = validator(value);

      expect(validation).toEqual(validation);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
      expect(v1.calledWith(value)).toBeTruthy();
    });
  });
});
