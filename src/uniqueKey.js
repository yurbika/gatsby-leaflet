import nextId from "react-id-generator"

const ID_GENERATOR = (prefix = "id") => nextId(prefix)

export default ID_GENERATOR
