import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ResumeScreen from "../screens/ResumeScreen";
import ResumeSkillScreen from "../screens/ResumeSkillScreen";
import ResumeLanguageScreen from "../screens/ResumeLanguageScreen";
import ResumeEducationScreen from "../screens/ResumeEducationScreen";
import ResumeExperienceScreen from "../screens/ResumeExperienceScreen";
import ResumePersonalScreen from "../screens/ResumePersonalScreen";
import ResumeJobPreferences from "../screens/ResumeJobPreferences";
import ResumeTrainingScreen from "../screens/ResumeTrainingScreen";
import ComplitedScreen from "../screens/ComplitedScreen";
import ResumeSkillScreenEdit from "../screens/ResumeSkillScreenEdit";
import ResumeLanguageScreenEdit from "../screens/ResumeLanguageScreenEdit";
import ResumeTrainingScreenEdit from "../screens/ResumeTrainingScreenEdit";
import ResumeEducationScreenEdit from "../screens/ResumeEducationScreenEdit";
import ResumeExperienceScreenEdit from "../screens/ResumeExperienceScreenEdit";
import ResumeBasicInfoEdit from "../screens/ResumeBasicInfoEdit";
import ResumePersonalInfoEdit from "../screens/ResumePersonalInfoEdit";
import ResumeUplaodScreen from "../screens/ResumeUplaodScreen";


const Stack = createStackNavigator();

const ResumeNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Resume" component={ResumeScreen} />
    <Stack.Screen name="Basic Info" component={ResumeBasicInfoEdit} />
    <Stack.Screen name="Personal Info" component={ResumePersonalInfoEdit} />
    <Stack.Screen name="Skill" component={ResumeSkillScreen} />
    <Stack.Screen name="Skill Update" component={ResumeSkillScreenEdit} />
    <Stack.Screen name="Language" component={ResumeLanguageScreen} />
    <Stack.Screen name="Education" component={ResumeEducationScreen} />
    <Stack.Screen
      name="Education Update"
      component={ResumeEducationScreenEdit}
    />
    <Stack.Screen name="Experience" component={ResumeExperienceScreen} />
    <Stack.Screen
      name="Experience Update"
      component={ResumeExperienceScreenEdit}
    />
    <Stack.Screen name="Personal Details" component={ResumePersonalScreen} />
    <Stack.Screen name="Job Preferences" component={ResumeJobPreferences} />
    <Stack.Screen name="Training" component={ResumeTrainingScreen} />
    <Stack.Screen name="Training Update" component={ResumeTrainingScreenEdit} />
    <Stack.Screen name="Done" component={ComplitedScreen} />
    <Stack.Screen name="Language Update" component={ResumeLanguageScreenEdit} />
    <Stack.Screen name="Photo Upload" component={ResumeUplaodScreen} />
  </Stack.Navigator>
);

export default ResumeNavigator;
