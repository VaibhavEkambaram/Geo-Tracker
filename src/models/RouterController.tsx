import {IonReactRouter} from "@ionic/react-router";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ActivityList from "../pages/activitylist/ActivityList";
import Settings from "../pages/settings/Settings";
import AddActivity from "../pages/addactivity/AddActivity";
import StartRecording from "../pages/startrecording/StartRecording";
import ActiveRecording from "../pages/activerecording/ActiveRecording";
import Summary from "../pages/summary/Summary";
import Activity from "../pages/activity/Activity";
import {analytics, body, settings} from "ionicons/icons";
import React from "react";

/**
 * Router Navigation Controller - This manages transitioning between different screen pages.
 */
export function RouterController() {
    return (
        <IonReactRouter>
            <IonTabs>
                {/* DashboardPresenter */}
                <IonRouterOutlet>
                    <Route exact path="/dashboard"><Dashboard/></Route>
                    {/* Activity List */}
                    <Route exact path="/activitylist"><ActivityList/></Route>
                    {/* Settings */}
                    <Route path="/settings"><Settings/></Route>
                    {/* Add Activity */}
                    <Route exact path="/AddActivity"><AddActivity/></Route>
                    {/* Start Recording */}
                    <Route exact path="/StartRecording"><StartRecording/></Route>
                    {/* Active Recording */}
                    <Route exact path="/ActiveRecording"><ActiveRecording/></Route>
                    {/* Summary */}
                    <Route exact path="/Summary"><Summary/></Route>
                    {/* Activity View */}
                    <Route exact path="/Activity"><Activity/></Route>
                    {/* Default View - This should route to the dashboard */}
                    <Route exact path="/"><Redirect to="/dashboard"/></Route>
                </IonRouterOutlet>

                {/* Tab Navigation Bar */}
                <IonTabBar slot="bottom">
                    {/* DashboardPresenter Button */}
                    <IonTabButton tab="dashboard" href="/dashboard">
                        <IonIcon icon={analytics}/><IonLabel>Dashboard</IonLabel>
                    </IonTabButton>
                    {/* Activity List */}
                    <IonTabButton tab="activitylist" href="/activitylist">
                        <IonIcon icon={body}/><IonLabel>My Activities</IonLabel>
                    </IonTabButton>
                    {/* Settings */}
                    <IonTabButton tab="settings" href="/settings">
                        <IonIcon icon={settings}/><IonLabel>Settings</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}
