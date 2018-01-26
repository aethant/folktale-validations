import { always } from 'ramda';
import {
  joinWithComma,
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  quoteAndJoinWithComma,
  quote,
  wrapSB,
  tabsForLevel,
  joinWithSpace,
} from './utils';
import { ROOT_FIELD } from './const';

// -----------------------------------------------------------------------------
// Message Renderers
// -----------------------------------------------------------------------------

export const prefixWithKey = (level, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – Key`, s]);

export const prefixWithIndex = (level, index, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – [${index}]`, s]);

export const objectValueErrorMessage = (level, name) => value =>
  prefixWithKey(level, joinWithColon([quote(name), value]));

export const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value);

export const invalidObjectPrefix = always(`Object`);

export const invalidArrayPrefix = always(`Array`);

export const invalidObjectReasonInvalidValues = always(
  `included invalid value(s)`
);
export const invalidArrayReasonInvalidObjects = always(
  `included invalid object(s)`
);

// -----------------------------------------------------------------------------
// Validator Helper Messages
// -----------------------------------------------------------------------------

const prefixForTypeErrorMessage = complement =>
  complement ? `Was type` : `Wasn't type`;

export const typeErrorMessage = (typeName, complement = false) =>
  joinWithColon([prefixForTypeErrorMessage(complement), quote(typeName)]);

// -----------------------------------------------------------------------------
// Validator Messages
// -----------------------------------------------------------------------------

export const invalidObjectReasonInvalidKeys = always(`included invalid key(s)`);

export const isEmptyErrorMessage = always(`Was Empty`);

export const validNumberErrorMessage = always(`Wasn't a valid Number`);

export const lengthGreaterThanErrorMessage = length =>
  `Length must be greater than ${length}`;

export const lengthLessThanErrorMessage = length =>
  `Length must be less than ${length}`;

export const arrayElementErrorMessage = (value, message) =>
  joinWithColon([quote(value), message]);

export const arrayElementsErrorMessage = elementErrorMessages =>
  joinWithColon([
    `Array contained invalid element(s)`,
    joinWithComma(elementErrorMessages),
  ]);

export const whitelistErrorMessage = whitelist =>
  joinWithColon([
    `Value wasn't one of the accepted values`,
    joinWithComma(whitelist),
  ]);

export const invalidKeysErrorMessage = invalidKeys =>
  joinWithColon([
    `Object included invalid key(s)`,
    quote(wrapSB(joinWithComma(invalidKeys))),
  ]);

export const numberWithUnitErrorMessage = unit =>
  joinWithColon([`Wasn't number with unit`, quote(unit)]);

export const valuesErrorMessage = messages =>
  joinWithColon([`Object included invalid values(s)`, joinWithComma(messages)]);

// -----------------------------------------------------------------------------
// Constraint Validator Messages
// -----------------------------------------------------------------------------

export const missingRequiredKeyErrorMessage = keys =>
  joinWithColon([
    `Object was missing required key(s)`,
    wrapSB(quoteAndJoinWithComma(keys)),
  ]);

export const objectValidatorErrorMessage = fieldName => messages =>
  fieldName === ROOT_FIELD
    ? joinWithColon([`Object Invalid`, messages])
    : `for field ${joinWithColon([quote(fieldName), messages])}`;

export const exclusiveKeyErrorMessage = keys =>
  joinWithColon([
    `Object had more than one exlusive key`,
    wrapSB(quoteAndJoinWithComma(keys)),
  ]);

export const fieldErrorMessage = (field, errorMessage) =>
  `Field ${joinWithColon([quote(field), errorMessage])}`;

export const valueErrorMessage = name => value =>
  `Key ${joinWithColon([quote(name), value])}`;

export const constraintValidatorErrorMessage = messages =>
  `Constraints ${messages}`;

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export const andErrorMessages = joinWithAnd;
export const orErrorMessages = joinWithOr;
