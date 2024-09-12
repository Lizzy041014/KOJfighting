import { defineStore } from 'pinia';
export interface Question {
    topicId: number;
    title: string;
    difficulty: string;
    from: string;
    labels?: { labelId: number; labelName: string }[];
    updateTime?:string;
}
export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        questions: [] as Question[],
         queryCondition: null as string | null,
    }),
    actions: {
        setQuestions(questions: Question[]) {
            this.questions = questions;
        },
        setQueryCondition(condition: string | null) {
            this.queryCondition = condition;
        }
    }
});
