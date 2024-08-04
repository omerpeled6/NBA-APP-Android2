import MainApp from './components/MainApp';
import { PriceAndCountContext } from './PriceAndCountContext';

export default function App() {
  return (
    <div>
      <PriceAndCountContext>
        <MainApp />
      </PriceAndCountContext>
    </div>
  );
}
