import { flip, gt, compose, length } from 'ramda'
import predicateValidator from '../../helpers/predicateValidator'
import { VALIDATE_IS_LENGTH_GREATER_THAN } from '../../const/validatorUids'

export default stringLength =>
  predicateValidator(
    compose(flip(gt)(stringLength), length),
    VALIDATE_IS_LENGTH_GREATER_THAN,
    [stringLength]
  )
