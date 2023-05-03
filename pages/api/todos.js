const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export default async function handler(req, res) {
  const response = await fetch(DATA_SOURCE_URL)
  const todos = await response.json()
  res.json(todos)
}