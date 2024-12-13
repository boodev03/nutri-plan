import { UserInfo } from '../../../types/user';

export function formatPromptTemplate(template: string, userInfo: UserInfo): string {
  const replacements = {
    '{{age}}': userInfo.age.toString(),
    '{{weight}}': userInfo.weight.toString(),
    '{{height}}': userInfo.height.toString(),
    '{{activityLevel}}': formatActivityLevel(userInfo.activityLevel),
    '{{goal}}': formatGoal(userInfo.goal)
  };

  return Object.entries(replacements).reduce(
    (prompt, [key, value]) => prompt.replace(key, value),
    template
  );
}

function formatActivityLevel(level: string): string {
  return level.replace('_', ' ').toLowerCase();
}

function formatGoal(goal: string): string {
  return goal.replace('_', ' ').toLowerCase();
}