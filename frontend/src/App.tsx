
import './App.css';
import { updateWattage } from './app/stores/wattage-slice';
import { RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import LayoutComponent from './features/layout';
import { Layout, Views } from './app/dto/configuration.dto';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { Button } from '@mui/material';
import { Popup } from './features/popup';
import { useWsSubscription } from './app/ws';
import { updateIp, updateLayout, updateOffline } from './app/stores/configuration-slice';
import LaunchPage from './pages/launch';

function App() {
  const layout = useSelector((state: RootState) => state.configuration.layout);
  const dispatch = useDispatch();

  useWsSubscription<Layout>("/topic/configuration/layout", (layout) => {
    dispatch(updateLayout(layout));
  });

  useSubscription("/topic/configuration/ip", (ip) => {
    dispatch(updateIp(ip.body));
  });

  useWsSubscription<boolean>("/topic/configuration/offline", (offline) => {
    dispatch(updateOffline(offline));
  });

  const client = useStompClient()

  const handleButtonClick = () => {
    const value = Math.floor(Math.random() * 100000)
    dispatch(updateWattage(value))
    client?.publish({
      destination: "/app/hello",
      "body": "Hello from ws"
    })
  };

  /*const layout: Layout = {
    rowCounts: 3,
    rows: [
      {
        columnCounts: 4,
        columns: [
          {
            view: Views.ELECTRICITY_PRICE_NOW,
            weight: 1
          },
          {
            view: Views.ELECTRICITY_WATTAGE,
            weight: 1.5
          }
        ],
        weight: 1
      },
      {
        columnCounts: 2,
        columns: [
          {
            view: Views.ELECTRICITY_PRICE,
            weight: 1
          },
        ],
        weight: 2
      },
      {
        columnCounts: 2,
        columns: [
          {
            view: Views.ELECTRICITY_METER,
            weight: 1
          }
        ],
        weight: 1
      }
    ]
  };
  */


  return (
    <div className="App">
        <Popup />
        <Button style={{height: "20px", position: "fixed", display: "none"}} onClick={handleButtonClick} >Test</Button>
        {layout ?
          <LayoutComponent layout={layout} />
          :
          <LaunchPage />
        }
    </div>
  );
}

export default App;
