export function validateEmptyAndLenght (value) {
  if (!value) {
    return 'Campo obrigatório.'
  }

  if (value.length < 3) {
    return 'Esse campo precisa de pelo menos 3 caracteres'
  }

  return true
}

export function validadeValueTransition (value) {
  if (!value) {
    return 'Campo obrigatório'
  }

  return true
}

export function validateType (value) {
  if (value === undefined) {
    return 'Campo obrigatório'
  }

  return true
}
