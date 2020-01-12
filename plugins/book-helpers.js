export function hasAuthor(book, query) {
    return book.volumeInfo.authors.join('').toLowerCase().includes(query.toLowerCase())
}

export function hasTitle(book, query) {
  return book.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
}

export function hasCategory(book, query) {
  return book.volumeInfo.infoLink.includes(query.toLowerCase()) || book.volumeInfo.previewLink.includes(query.toLowerCase())
}
