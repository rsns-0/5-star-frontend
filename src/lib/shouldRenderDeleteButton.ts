export const shouldRenderDeleteButton = (type: "update" | "create") => {
	if (type === "create") return false
	if (type === "update") return true
	throw new Error("Invalid type")
}
