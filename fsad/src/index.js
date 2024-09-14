import ReactDOM from "react-dom/client"
import App from "./First";


const rootElement=document.getElementById("root");
const rootRef=ReactDOM.createRoot(rootElement)
rootRef.render(<App />)