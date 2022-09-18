import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes/Routes';
import './Styles/index.css'
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import Layout from './Layouts/Layout'
import { ApiCallsProvider } from './Contexts/ApiCallsContext'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StylesProvider injectFirst>
          <ApiCallsProvider>
          <Layout>
            <Routes/>
          </Layout>
          </ApiCallsProvider>
        </StylesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
