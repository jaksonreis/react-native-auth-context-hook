import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Dashboard } from "../pages/Dashboard";


const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="DashBoard" component={Dashboard}/>
    </AppStack.Navigator>
)

export default AppRoutes;