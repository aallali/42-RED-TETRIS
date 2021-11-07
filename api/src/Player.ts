

export default class Player {
	public id: string
	public name: string
	public score: number
	public level: number
	public rows: number
	public lost: boolean
	public room?: string

	constructor(id: string, name: string) {
		this.id = id
		this.name = name
		this.score = 0
		this.level = 0
		this.rows = 0
		this.lost = false
	}

	NEW_SCORE(score: number, level: number, rows: number) {
		const new_roows = rows - this.rows
		this.score = score
		this.level = level
		this.rows = rows
		const pyld = {
			new_roows,
			score:this.score,
			level:this.level,
			rows: this.rows,
			name: this.name
		}
		console.log(`player [${this.name}] cleared [+${pyld.new_roows}]`)
		// TODO : emit new roows to "NEW SCORE"
		// this.socket.broadcast.to(this.room).emit("NEW_SCORE", pyld)
		return pyld
	}

	LOOSE() {
		return new Promise((resolve, reject) => {
			this.lost = true
			console.log(this.name + " has lost the game.")
			resolve(this.lost)
		})

	}
	IS_LOST() {
		return this.lost
	}


}