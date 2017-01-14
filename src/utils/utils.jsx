
function Utils() {

	this.time = () => {

		const d = new Date()
	    const year = d.getYear()
	    const month = d.getMonth()
	    const day = d.getDay()

	    const out = year + month + day

	    console.log('date', year)

	    return out

	}
}

export default Utils