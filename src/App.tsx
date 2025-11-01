import ProductListPage from './components/ProductListPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <ProductListPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
