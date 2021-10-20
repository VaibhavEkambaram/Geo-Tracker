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
import {analytics, body, settings} from 'ionicons/icons';


import Dashboard from './pages/home/Dashboard';
import ActivityList from './pages/home/ActivityList';
import Settings from './pages/home/Settings';

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
import AddActivity from './pages/recording/AddActivity';
import StartRecording from './pages/recording/StartRecording';
import ActiveRecording from './pages/recording/ActiveRecording';
import Summary from './pages/recording/Summary';
import ActivityView from './pages/list/ActivityView';
import React from "react";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Dashboard />
          </Route>
          <Route exact path="/tab2">
            <ActivityList />
          </Route>
          <Route path="/tab3">
            <Settings />
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
          <Route exact path="/ActivityView">
            <ActivityView />
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
