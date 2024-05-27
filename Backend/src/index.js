import app from "./app.js";
import './bd.js'
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Servidor arrancado en: http://localhost:${PORT}`);
})