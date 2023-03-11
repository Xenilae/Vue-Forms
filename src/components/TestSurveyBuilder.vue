<script>
import { ref, onMounted, onRootMounted, onRootUpdated } from 'vue';
import SurveyBuilder from './SurveyBuilder.vue';
import QuestionsView from './QuestionsView';
import sampleQuestionObj from './survey-builder.json';

export default {
  name: 'TestSurveyBuilder',
  components: { SurveyBuilder, QuestionsView },
  setup() {
    const questionsList = ref([]);
    const addQuestion = ref(false);
    const sampleQuestion = ref(sampleQuestionObj);

    const updateQuestionsList = question => {
      const questionIndex = questionsList.value.findIndex(x => x.id === question.id);
      if (questionIndex >= 0) {
        questionsList.value.splice(questionIndex, 1, question);
      } else {
        questionsList.value.push(JSON.parse(JSON.stringify(question)));
      }
      addQuestion.value = false;
      window.console.log(question, addQuestion.value, questionsList.value);
    };

    const addNewQuestion = () => {
      sampleQuestion.value = JSON.parse(JSON.stringify(sampleQuestionObj));
      addQuestion.value = true;
    };

    onMounted(() => {
      onRootMounted(() => {
        const selectedQuestion = ref(null);
        onRootUpdated(() => {
          if (selectedQuestion.value) {
            addQuestion.value = true;
            sampleQuestion.value = selectedQuestion.value;
          }
        });
      });
    });

    return {
      questionsList,
      addQuestion,
      sampleQuestion,
      updateQuestionsList,
      addNewQuestion,
    };
  },
};
</script>

<template>
  <div class="test-survey-builder">
    <h2 class="text-center">Vue Survey Builder Demo</h2>
    <hr/>
      <SurveyBuilder v-if="addQuestion" :sampleQuestion="sampleQuestion" @update-question="updateQuestionsList" />
    <QuestionsView v-else :questionsList="questionsList" @add-question="addNewQuestion" @update-question="updateQuestionsList" />
    <div class="pt-10">
      <button type="button" class="add_another_btn br-25" @click="addNewQuestion()">Add question</button>
    </div>
  </div>
</template>

<style scoped>
.add_another_btn {
  font-size: 14px;
  background-color: transparent;
  border-color: #4c8ce4;
  color: #4c8ce4;
  padding: 8px;
  cursor: pointer;
}
.text-center {
  text-align: center;
}
</style>