import '../app.css'
import Options from '../components/Options.svelte'

const app = new Options({
	target: document.getElementById('app')!,
})

export default app
