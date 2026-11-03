export const formatDate = (incomingDate) => {
	let humanReadableDate = new Date(incomingDate);
	return humanReadableDate.toLocaleString();
}