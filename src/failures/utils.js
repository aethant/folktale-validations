import {
  prop,
  fromPairs,
  compose,
  mergeAll,
  objOf,
  assoc,
  map,
  has,
  either,
  both,
  all,
} from 'ramda'
import { isObj } from 'ramda-adjunct'
import FAILURE_FIELD_NAMES from '../const/failureFieldNames'
import { propValue } from '../utils/failures'
import { constraintsObjName } from '../messages'
import { joinWithDot } from '../utils/formatting'
import { appendRight } from '../utils/array'
import { throwError, invalidFailureStructureErrorMessage } from '../errors'

const {
  FIELDS_FAILURE_MESSAGE,
  FIELDS,
  CHILDREN,
  NAME,
  AND,
  OR,
} = FAILURE_FIELD_NAMES

const UIDPrefix = `folktale-validations.validate`
const failuresToChildren = map(compose(objOf(CHILDREN), map(propValue)))

export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs)
export const toConstraintsError = compose(assoc(NAME, constraintsObjName()))
export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE)
export const toArrayError = objOf(CHILDREN)
export const toChildrenFieldsError = compose(objOf(FIELDS), failuresToChildren)

export const propAnd = prop(AND)
export const propOr = prop(OR)
export const isAndObj = has(AND)
export const isOrObj = has(OR)
export const isAndOrOrObj = both(isObj, either(isAndObj, isOrObj))
export const isPayload = all(has())

export const toValidatorUID = compose(joinWithDot, appendRight([UIDPrefix]))

export const throwInvalidFailureStructureMessage = compose(
  throwError,
  invalidFailureStructureErrorMessage
)
