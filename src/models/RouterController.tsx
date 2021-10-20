import {IonReactRouter} from "@ionic/react-router";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Dashboard from "../pages/home/Dashboard";
import ActivityList from "../pages/home/ActivityList";
import Settings from "../pages/home/Settings";
import AddActivity from "../pages/recording/AddActivity";
import StartRecording from "../pages/recording/StartRecording";
import ActiveRecording from "../pages/recording/ActiveRecording";
import Summary from "../pages/recording/Summary";
import ActivityView from "../pages/list/ActivityView";
import {analytics, body, settings} from "ionicons/icons";
import React from "react";

/**
 * Router Navigation Controller - This manages transitioning between different screen pages.
 */
export function RouterController() {
    return (
        <IonReactRouter>
            <IonTabs>
                {/* Dashboard */}
                <IonRouterOutlet>
                    <Route exact path="/dashboard">
                        <Dashboard/>
                    </Route>
                    {/* Activity List */}
                    <Route exact path="/activitylist">
                        <ActivityList/>
                    </Route>
                    {/* Settings */}
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                    {/* Add Activity */}
                    <Route exact path="/AddActivity">
                        <AddActivity/>
                    </Route>
                    {/* Start Recording */}
                    <Route exact path="/StartRecording">
                        <StartRecording/>
                    </Route>
                    {/* Active Recording */}
                    <Route exact path="/ActiveRecording">
                        <ActiveRecording/>
                    </Route>
                    {/* Summary */}
                    <Route exact path="/Summary">
                        <Summary/>
                    </Route>
                    {/* Activity View */}
                    <Route exact path="/ActivityView">
                        <ActivityView/>
                    </Route>
                    {/* Default View - This should route to the dashboard */}
                    <Route exact path="/">
                        <Redirect to="/dashboard"/>
                    </Route>
                </IonRouterOutlet>

                {/* Tab Navigation Bar */}
                <IonTabBar slot="bottom">
                    {/* Dashboard Button */}
                    <IonTabButton tab="dashboard" href="/dashboard">
                        <IonIcon icon={analytics}/>
                        <IonLabel>Dashboard</IonLabel>
                    </IonTabButton>
                    {/* Activity List */}
                    <IonTabButton tab="activitylist" href="/activitylist">
                        <IonIcon icon={body}/>
                        <IonLabel>My Activities</IonLabel>
                    </IonTabButton>
                    {/* Settings */}
                    <IonTabButton tab="settings" href="/settings">
                        <IonIcon icon={settings}/>
                        <IonLabel>Settings</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}
