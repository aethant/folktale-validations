import { assoc } from 'ramda'
import predicateValidator from '../../helpers/predicateValidator'
import { reduceObjIndexed } from '../../utils/iteration'
import { toValidatorUID } from '../../utils/failures'
import predicates from './predicates'

const buildValidator = (acc, [_, [name, predicate]]) => {
  const validatorUID = toValidatorUID(name)
  return assoc(name, predicateValidator(predicate, validatorUID), acc)
}

export const {
  // Basic Types
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsNotObject,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsString,
  validateIsNotString,
  validateIsFunction,
  validateIsNotFunction,
  validateIsNumber,
  validateIsNotNumber,
  // Complex Objs
  validateIsDate,
  validateIsNotDate,
  validateIsRegExp,
  validateIsNotRegExp,
  validateIsPlainObject,
  validateIsNotPlainObject,
  // Nil Values
  validateIsNaN,
  validateIsNotNaN,
  validateIsNil,
  validateIsNull,
  validateIsNotNull,
  validateIsUndefined,
  validateIsNotUndefined,
  // Empty
  validateIsEmpty,
  validateIsNotEmpty,
  validateIsEmptyArray,
  validateIsNonEmptyArray,
  validateIsEmptyString,
  validateIsNonEmptyString,
  // Valid
  validateIsValidNumber,
  validateIsNotValidNumber,
  validateIsValidDate,
  validateIsNotValidDate,
  // Numeric
  validateIsInteger,
  validateIsNotInteger,
  validateIsPositive,
  validateIsNegative,
  validateIsNonPositive,
  validateIsNonNegative,
  // Truth
  validateIsTrue,
  validateIsFalse,
  validateIsTruthy,
  validateIsFalsy,
} = reduceObjIndexed(buildValidator, {}, predicates)
