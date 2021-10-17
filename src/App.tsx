import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {analytics, body, ellipse, settings, square, triangle, walk} from 'ionicons/icons';


import DashboardScreen from './pages/DashboardScreen';
import ActivityListScreen from './pages/ActivityListScreen';
import SettingsScreen from './pages/SettingsScreen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddActivity from './pages/AddActivity';
import StartRecording from './pages/StartRecording';
import ActiveRecording from './pages/ActiveRecording';
import Summary from './pages/Summary';
import ViewActivity from './pages/ViewActivity';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <DashboardScreen />
          </Route>
          <Route exact path="/tab2">
            <ActivityListScreen />
          </Route>
          <Route path="/tab3">
            <SettingsScreen />
          </Route>
          <Route exact path="/AddActivity">
            <AddActivity />
          </Route>
          <Route exact path="/StartRecording">
            <StartRecording />
          </Route>
          <Route exact path="/ActiveRecording">
            <ActiveRecording />
          </Route>
          <Route exact path="/Summary">
            <Summary />
          </Route>
          <Route exact path="/ViewActivity">
            <ViewActivity />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={analytics} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={body} />
            <IonLabel>My Activities</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
