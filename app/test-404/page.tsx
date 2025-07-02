import { notFound } from "next/navigation"

export default function Test404() {
  // Esto forzará que se muestre la página 404
  notFound()
}
