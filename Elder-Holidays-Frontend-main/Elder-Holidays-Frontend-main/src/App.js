import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

function App() {

  const queryClient = new QueryClient();

  return (
    <div className="App 2xl:container mx-auto overflow-hidden">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} >
          <Header></Header>
        </RouterProvider>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
