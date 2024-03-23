import queryString from 'query-string'

const queryObject = ref<Query>({})

const useQueryString = () => '?' + queryString.stringify(queryObject.value)

const useReset = () => {
  queryObject.value = {}
}

export { queryObject, useQueryString, useReset }
