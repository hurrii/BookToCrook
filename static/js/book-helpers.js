export function hasAuthor(book, query) {
    return book.volumeInfo.authors.join('').toLowerCase().includes(query)
}

export function hasTitle(book, query) {
  return book.volumeInfo.title.toLowerCase().includes(query)
}

export function hasCategory(book, query) {
  return book.volumeInfo.infoLink.includes(query) || book.volumeInfo.previewLink.includes(query)
}
