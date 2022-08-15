function camelCaseSeparator(sentence: string): string {
  if (!sentence) {
    return sentence
  }
  return (
    sentence.charAt(0).toUpperCase() +
    sentence.slice(1).replace(/([A-z])([A-Z])/g, '$1 $2')
  )
}

export default camelCaseSeparator
